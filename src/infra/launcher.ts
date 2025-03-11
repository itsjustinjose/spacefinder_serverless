import { App } from "aws-cdk-lib";
import { dataStack } from "./stacks/dataStack";
import { lambdaStack } from "./stacks/lambdaStack";
import { apiStack } from "./stacks/apiStack";


const app = new App();
new dataStack(app, 'dataStack');
const lambdaStackInstance  = new lambdaStack(app, 'lambdaStack');
new apiStack(app,'apiStack', {
    helloLambdaIntegration: lambdaStackInstance.helloLambdaIntegration
})

