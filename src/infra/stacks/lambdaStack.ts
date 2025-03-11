import {Stack, StackProps} from 'aws-cdk-lib'
import { Code, Function as lambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'
import { join } from 'path'


export class lambdaStack extends Stack{
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        new lambdaFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'hello.main',
            code: Code.fromAsset(join(__dirname,'..','..','services'))

        })
    }
} 