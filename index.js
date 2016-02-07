"use strict";

const debug = require("debug")("ecs:index");
const co = require("co");
const config = require("config");

const TaskDefinition = require("./lib/TaskDefinition");
TaskDefinition.AwsOpts = config.awsOpts;

co(function*(){
  var taskDefClasses = config.taskDefinitions.map(td => {
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
});