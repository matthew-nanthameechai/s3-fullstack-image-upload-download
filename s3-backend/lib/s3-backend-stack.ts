import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createCognitoExampleAuth } from './auth/cognito';
import { createUpDownImagesBucket } from './storage/uploadDownloadBucket';


export class S3BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const appName = 'yt-updown-sample'

		const auth = createCognitoExampleAuth(this, {
			appName,
		})
		const bucket = createUpDownImagesBucket(this, {
			authenticatedRole: auth.identityPool.authenticatedRole,
		})

		new cdk.CfnOutput(this, 'UserPoolId', {
			value: auth.userPool.userPoolId,
		})
		new cdk.CfnOutput(this, 'UserPoolClientId', {
			value: auth.userPoolClient.userPoolClientId,
		})
		new cdk.CfnOutput(this, 'IdentityPoolId', {
			value: auth.identityPool.identityPoolId,
		})
		new cdk.CfnOutput(this, 'BucketName', {
			value: bucket.bucketName,
		})
		new cdk.CfnOutput(this, 'Region', {
			value: this.region,
		})
  }
}
