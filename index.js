"use strict";

const debug = require("debug")("ecs:index");
const co = require("co");
const glob = require("glob");
const path = require("path");
const config = require("config");
const commander = require("commander");
const ECSZ = require("aws-ecs-z");

commander.command("runTask")
  .description("run tasks [templates/rundef/*.js]")
  .action(function(){
    co(function*(){
      ECSZ.Task.AwsOpts = config.awsOpts;
      let runDefs =  glob.sync("templates/taskrun/*.js")
        .map(f => require(path.join(__dirname, f)))
        .map(json => new ECSZ.Task(json));

      let r =  yield runDefs.map(rd =>  rd.run());
      console.log(r);
      process.exit(0);
    }).catch(function(err){
      console.error("operation failed!", err);
      process.exit(1);
    });
  });
  
commander.command("deployTaskDef")
  .description("create or replace TaskDefinition [templates/taskdef/*.js]")
  .action(function(){
    co(function*(){
      ECSZ.TaskDefinition.AwsOpts = config.awsOpts;
      let taskdefs = glob.sync("templates/taskdef/*.js")
        .map(f => require(path.join(__dirname, f)))
        .map(json => new ECSZ.TaskDefinition(json));
        
      let r = yield taskdefs.map(td => td.createOrUpdate());
      console.log(r);
      process.exit(0);
    }).catch(function(err){
      console.error("operation failed!", err);
      process.exit(1);
    });
  });
  
commander.command("deployService")
  .description("create or replace Service [templates/service/*.js]")
  .action(function(){
    co(function*(){
      ECSZ.Service.AwsOpts = config.awsOpts;
      let services = glob.sync("templates/service/*.js")
        .map(f => require(path.join(__dirname, f)))
        .map(json => new ECSZ.Service(json));
      let r = yield services.map(sv => sv.createOrUpdate());
      console.log(r);
      process.exit(0);
    }).catch(function(err){
      console.error("operation failed!", err);
      process.exit(1);
    });
  });

if(process.argv.length < 3) process.argv.push("--help");
commander.parse(process.argv);