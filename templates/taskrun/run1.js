"use strict";
var config = require("config");

module.exports = {
  taskDefinition: 'awscli:12',
  cluster: config.clusterName,
  count: 1,
  overrides: {
    containerOverrides: [
      {
        name: "aws-cli",
        command: ["aws","ec2","describe-instances"],
        environment: [
          {
            name: 'DEBUG',
            value: '*'
          },
          /* more items */
        ],
      },
    ]
  },
}