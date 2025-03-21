import {Stack, StackProps} from 'aws-cdk-lib'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { Code, Function as lambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import { join } from 'path'
import { handler } from '../../services/hello'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'

interface lambdaStackProps extends StackProps{
    spacesTable: ITable
}
export class lambdaStack extends Stack{

    public readonly spacesLambdaIntegration: LambdaIntegration

    constructor(scope: Construct, id: string, props: lambdaStackProps) {
        super(scope, id, props)

        const spacesLambda = new NodejsFunction(this, 'SpacesLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '..','..', 'services', 'spaces', 'handler.ts')),
            environment: {
                TABLE_NAME: props.spacesTable.tableName
            }
        });

        spacesLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [props.spacesTable.tableArn],
            actions:[
                'dynamodb:PutItem'
            ]
        }))
 
        this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda) 
    }
} 