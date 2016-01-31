var debug = require("debug")("ecs:taskdef");
var config = require("config");
var AWS = require("aws-sdk-promise");
var ECS = new AWS.ECS(config.awsOpts);

/**
 * @param td taskDefinition
 */
var TaskDefinition = function(td) {
  this.def = td;
}

TaskDefinition.prototype.createOrUpdate = function*() {
  var td = yield findTaskDefinition(this.family);
  if(td) {
    console.log("update TaskDefinition[%s][%d->%d]",this.def.family, td.revision, this.def.revision);
    if(this.def.revision <= td.revision) {
      console.log("アップデートしませんでした。")
      return;
    }
  } else {
    console.log("create new TaskDefinition[%s]",this.def.family);
  }
  
  delete this.def.revision;
  var res = yield ECS.registerTaskDefinition(this.def).promise();
  debug(res.data);
  return;
}

module.exports = TaskDefinition;


function* findTaskDefinition(taskDefName){
  var res = yield ECS.listTaskDefinitionFamilies({familyPrefix: taskDefName}).promise();
  debug(res.data);
  var f = res.data.families.filter(function(e){return e == taskDefName})[0];
  if(!f) return undefined;
  
  var res2 = yield ECS.describeTaskDefinition({taskDefinition: taskDefName}).promise();
  return res2.data.taskDefinition;
}

