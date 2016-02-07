"use strict";

const co = require("co");
const debug = require("debug")("ecs:service");
const AWS = require("aws-sdk-promise");
var ECS = new AWS.ECS();

class Service {
  constructor(clusterName, serviceDef) {
    this.cluster = clusterName;
    this.def = serviceDef;
  }
  
   static set AwsOpt(awsOpts) {
    ECS = new AWS.ECS(awsOpts)
  }
  
  createOrUpdate() {
    let self = this;
    return function*(){
      let sv = yield Service.findService();
      if(sv) {
        ECS.updateService(self.def);
      } else {
        ECS.createService(self.def);
      }
    }
  }
  
  static findService(clusterName, serviceName) {
    return function*() {
      let res = yield ECS.describeServices({
        cluster: clusterName,
        services: [serviceName]
      });
      debug(JSON.stringify(res,null,2));
      return res.data.services[0];
    }
  }
}