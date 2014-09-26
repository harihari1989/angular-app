angular.module('resources.productbacklog', ['dbResource']);
angular.module('resources.productbacklog').factory('ProductBacklog', ['dbResource', function (dbResource) {

  var ProductBacklog = dbResource('productbacklog');

  ProductBacklog.getCollectionName = function(){
    return 'productbacklog';    
  };
   
  ProductBacklog.forProject = function (projectId, successcb, errorcb) {
    return ProductBacklog.forResource('projects', projectId, successcb, errorcb);
    //return ProductBacklog.query({query:{projectId:projectId}}, successcb, errorcb);
  };

  ProductBacklog.forSprint = function (sprintId, successcb, errorcb) {
  	console.log("Inside Product Backlog for sprint=");
    return ProductBacklog.forResource('sprints', sprintId, successcb, errorcb);
    //return ProductBacklog.query({query:{sprintId:sprintId}}, successcb, errorcb);
  };

  return ProductBacklog;
}]);
