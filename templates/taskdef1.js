module.exports = {
  "family": "awscli",
  "revision": 3,
  "volumes": [],
  "containerDefinitions": [
    {
      "volumesFrom": [],
      "memory": 128,
      "extraHosts": null,
      "dnsServers": null,
      "disableNetworking": null,
      "dnsSearchDomains": null,
      "portMappings": [],
      "hostname": null,
      "essential": true,
      "entryPoint": null,
      "mountPoints": [],
      "name": "aws-cli",
      "ulimits": null,
      "dockerSecurityOptions": null,
      "environment": [],
      "links": null,
      "workingDirectory": null,
      "readonlyRootFilesystem": null,
      "image": "anigeo/awscli",
      "command": [
        "ec2",
        "describe-instances"
      ],
      "user": null,
      "dockerLabels": null,
      "logConfiguration": {
        "logDriver": "fluentd",
        "options": {
          "fluentd-address": "127.0.0.1:22424"
        }
      },
      "cpu": 10,
      "privileged": null
    }
  ],
}
