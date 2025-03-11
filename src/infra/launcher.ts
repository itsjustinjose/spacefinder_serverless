import { App } from "aws-cdk-lib";
import { dataStack } from "./stacks/dataStack";
import { lambdaStack } from "./stacks/lambdaStack";



const app = new App();
new dataStack(app, 'dataStack');
new lambdaStack(app, 'lambdaStack')