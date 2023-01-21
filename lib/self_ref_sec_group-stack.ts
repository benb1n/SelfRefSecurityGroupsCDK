import * as cdk from 'aws-cdk-lib';
import { IpAddresses, Port, SecurityGroup, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class SelfRefSecGroupStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "vpc", {
      ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
      subnetConfiguration: [
        {
          name: "public-subnet",
          subnetType: SubnetType.PUBLIC,
          cidrMask: 20,
        },
      ],
    })

    const selfRefSg = new SecurityGroup(this, "SelfRefSg", {
      vpc,
      allowAllOutbound: true,
    })

    selfRefSg.addIngressRule(
      selfRefSg,
      Port.allTraffic(),
      "allow local VPC traffic",
    )
  }
}
