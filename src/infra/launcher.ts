import { App } from "aws-cdk-lib";
import { dataStack } from "./stacks/dataStack";
import { lambdaStack } from "./stacks/lambdaStack";
import { apiStack } from "./stacks/apiStack";


const app = new App();
const DataStack = new dataStack(app, 'dataStack');
const LambdaStack  = new lambdaStack(app, 'lambdaStack',{
    spacesTable: DataStack.spacesTable
});
new apiStack(app,'apiStack', {
   spacesLambdaIntegration: LambdaStack.spacesLambdaIntegration
})

