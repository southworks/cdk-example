import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';

export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambda = new Function(this, 'LambdaFunction', {
            functionName: "CdkExampleLambdaFunction",
            runtime: Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: new InlineCode(
                `exports.handler = async (event) => {
            console.log('Object created in Bucket');
            return "Object created in Bucket";
        };`
            )
        });

        const s3Bucket = new Bucket(this, 'S3Bucket', {
            bucketName: "cdkexamplebucket"
        });

        new cdk.aws_lambda.CfnPermission(this, 'LambdaPermission', {
            functionName: lambda.functionName,
            action: 'lambda:InvokeFunction',
            principal: 's3.amazonaws.com',
            sourceArn: s3Bucket.bucketArn,
            sourceAccount: '500737756044'
        });

        s3Bucket.addEventNotification(cdk.aws_s3.EventType.OBJECT_CREATED, new cdk.aws_s3_notifications.LambdaDestination(lambda));
    }
}