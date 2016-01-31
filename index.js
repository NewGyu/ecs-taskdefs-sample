"use strict";

var debug = require("debug")("ecs:index");
var co = require("co");
var config = require("config");

var TaskDefinition = require("./lib/TaskDefinition");

co(function*(){
  var taskDefClasses = config.taskDefinitions.map(function(td){
    return new TaskDefinition(td);
  });
  var r = yield taskDefClasses.map(function(td){
    return td.createOrUpdate();
  })
  
//  var taskdef = yield findTaskDefinition("awscli")
//  debug(taskdef);
//  var r = yield findService("helloService");
  console.log(r);
}).catch(function(err){
  console.error(err);
  process.exit(1);
})

function* createOrUpdate() {
  var taskDef = yield findTaskDefinition(taskDefName);
  ECS.registerTaskDefinition
}

/**
 * 
 */
function* findTaskDefinition(taskDefName) {
  var res = yield ECS.listTaskDefinitionFamilies({familyPrefix: taskDefName}).promise();
  debug(res.data);
  var f = res.data.families.filter(function(e){return e == taskDefName})[0];
  if(!f) return undefined;
  
  var res2 = yield ECS.describeTaskDefinition({taskDefinition: taskDefName}).promise();
  return res2.data.taskDefinition;
}


function* findService(serviceName) {
  var res = yield ECS.listServices({
    cluster: config.clusterName
  }).promise();
  debug(res.data);
  var f = res.data.serviceArns.filter(function(e){
    return e.match(serviceName + "$");
   })[0];
  if(!f) return undefined;
  
  var res2 = yield ECS.describeServices({
    cluster: config.clusterName,
    services: [f]
  }).promise();
  debug(res2.data);
  
  return res2.data.services[0];
}
/*
function* createOrUpdateService() {
  
}
*/