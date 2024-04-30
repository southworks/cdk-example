#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkExampleStack } from '../lib/cdk-example-stack';

const app = new cdk.App();
new CdkExampleStack(app, 'CdkExampleStack', {
  env: {
    account: '500737756044',
    region: 'us-east-1',
  }
});

app.synth();