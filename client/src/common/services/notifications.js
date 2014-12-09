angular.module('services.notifications', []).factory('notifications', ['$rootScope', function ($rootScope) {

  var notifications = {
    'STICKY' : [],
    'ROUTE_CURRENT' : [],
    'ROUTE_NEXT' : []
  };
  var notificationsService = {};

  var addNotification = function (notificationsArray, notificationObj) {
    if (!angular.isObject(notificationObj)) {
      throw new Error("Only object can be added to the notification service");
    }
    notificationsArray.push(notificationObj);
    return notificationObj;
  };

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous, other) {
	  // console.log("notifications before route change");
	  // console.log(JSON.stringify(notifications));
	  if( !angular.isDefined(current && current.$$route && current.$$route.redirectTo) ){
		  notifications.ROUTE_CURRENT.length = 0;
		  notifications.ROUTE_CURRENT = angular.copy(notifications.ROUTE_NEXT);
		  notifications.ROUTE_NEXT.length = 0;
	  }
	  // console.log("notifications after route change");
	  // console.log(JSON.stringify(notifications));
  });

  notificationsService.setClass = function(notification){
	  var typeClassMap = {
		  success: 'success',
		  error: 'warning'
	  }
	  notification.ngclass = typeClassMap[notification.type];
  };

  notificationsService.getCurrent = function(){
    return [].concat(notifications.STICKY, notifications.ROUTE_CURRENT);
  };

  notificationsService.pushSticky = function(notification) {
    return addNotification(notifications.STICKY, notification);
  };

  notificationsService.pushForCurrentRoute = function(notification) {
    return addNotification(notifications.ROUTE_CURRENT, notification);
  };

  notificationsService.pushForNextRoute = function(notification) {
    return addNotification(notifications.ROUTE_NEXT, notification);
  };

  notificationsService.remove = function(notification){
    angular.forEach(notifications, function (notificationsByType) {
      var idx = notificationsByType.indexOf(notification);
      if (idx>-1){
        notificationsByType.splice(idx,1);
      }
    });
  };

  notificationsService.removeAll = function(){
    angular.forEach(notifications, function (notificationsByType) {
      notificationsByType.length = 0;
    });
  };

  return notificationsService;
}]);