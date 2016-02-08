const config = require("config");
module.exports = {
  serviceName: 'testservice', 
  cluster: config.clusterName,
  taskDefinition: "fluent-awslogs:2",
  desiredCount: 1, /* required */
  deploymentConfiguration: {
    maximumPercent: 100,
    minimumHealthyPercent: 0
  },
}