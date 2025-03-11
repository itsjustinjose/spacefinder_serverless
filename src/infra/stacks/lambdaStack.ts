import {Stack, StackProps} from 'aws-cdk-lib'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { Code, Function as lambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'
import { join } from 'path'

interface lambdaStackProps extends StackProps{
    spacesTable: ITable
}
export class lambdaStack extends Stack{

    public readonly helloLambdaIntegration: LambdaIntegration

    constructor(scope: Construct, id: string, props: lambdaStackProps) {
        super(scope, id, props)

        const helloLambda = new lambdaFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'hello.main',
            code: Code.fromAsset(join(__dirname,'..','..','services')),
            environment: {
                TABLE_NAME: props.spacesTable.tableName
            }
        })

        this.helloLambdaIntegration = new LambdaIntegration(helloLambda) 
    }
} 