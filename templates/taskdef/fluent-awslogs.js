module.exports = {
  "family": "fluent-awslogs",
  "revision": 2,
  "containerDefinitions": [
    {
      "volumesFrom": [],
      "memory": 128,
      "extraHosts": null,
      "dnsServers": null,
      "disableNetworking": null,
      "dnsSearchDomains": null,
      "portMappings": [
        {
          "hostPort": 22424,
          "containerPort": 22424,
          "protocol": "tcp"
        }
      ],
      "hostname": null,
      "essential": true,
      "entryPoint": null,
      "mountPoints": [],
      "name": "fluent-awslogs",
      "ulimits": null,
      "dockerSecurityOptions": null,
      "environment": [
        {
          "name": "AWSLOGS_STREAM",
          "value": "batch"
        },
        {
          "name": "AWSLOGS_GROUP",
          "value": "personalize/batch/test"
        },
        {
          "name": "AWS_REGION",
          "value": "ap-northeast-1"
        }
      ],
      "links": null,
      "workingDirectory": null,
      "readonlyRootFilesystem": null,
      "image": "newgyu/fluent-awslogs",
      "command": null,
      "user": null,
      "dockerLabels": null,
      "cpu": 100,
      "privileged": null
    }
  ],
  "volumes": [],
}