module.exports = {
  clusterName: "ECS-Cluster-SAMPLE-DEV-MyECSCluster-1M2QW6MWY74VJ",
  taskDefinitions: [
    require("../templates/taskdef1")
  ],
  services: [
    
  ],
  awsOpts: {
    region: "ap-northeast-1"
  }
}