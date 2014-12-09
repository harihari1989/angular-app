angular.module('services.directiveInitializer', []);

angular.module('services.directiveInitializer').factory('directiveInitializer', [
	'$parse',
	'$interpolate',
	function ($parse, $interpolate) {
		var directiveInitializer = {
			// init: function (scope, attrs, model, initOptions, interpolationKeys, expressionKeys, attrDefaults, setupWatches) {
			init: function (scope, model, attrsData, setupWatches) {

				var attrs = attrsData.attrs || {};
				var initOptions =  attrsData.initOptions || {};
				var interpolationKeys =  attrsData.interpolationKeys || [];
				var booleanKeys =  attrsData.booleanKeys || [];
				var expressionKeys =  attrsData.expressionKeys || [];
				var attrDefaults =  attrsData.attrDefaults || {};
				setupWatches =  setupWatches || false;

				var toBoolean = function (value) {
					if( angular.isString(value) ){
						// console.log(value + ' is string');
						return (value === "true") ? true : false;
					}
					return value;
				};

				var booleanAssign = function (attr, value) {
					// console.log("calling boolean assign");
					if( booleanKeys.indexOf(attr) !== -1 ){
						// console.log(attr + ' is in boolean keys');
						return toBoolean(value);
					}
					return value;
				};

				// setup interpolated (@) attributes
				for(var $index = -1; ++$index < interpolationKeys.length;){
					(function () {
						var attr = interpolationKeys[$index];
						// model[attr] = initOptions[attr] || scope[attr] || attrDefaults[attr];
						model[attr] = scope[attr] || initOptions[attr] || attrDefaults[attr];
						model[attr] = booleanAssign(attr, model[attr]);

						if( angular.isDefined(scope[attr]) && setupWatches){
							// wire up the directive attributes to the model
							var watchAttr = function (scope) {
								return scope[attr];
							};
							scope.$watch(watchAttr, function (newVal, oldVal) {
								if( newVal !== oldVal ){
									// model[attr] = scope[attr];
									model[attr] = booleanAssign(attr, scope[attr]);
								}
							});
						}

						// if( setupWatches){
						if( angular.isDefined(scope.initOptions)
						 && angular.isDefined(scope.initOptions[attr]) && setupWatches){
							// wire up the initOptions attributes to the model
							var watchInitOption = function (scope) {
								return scope.initOptions[attr];
							};

							scope.$watch(watchInitOption, function (newVal, oldVal) {
								// console.log("Is this happening");
								if( newVal !== oldVal ){
									// console.log("are we getting in");
									// console.log(attr);
									// model[attr] = scope.initOptions[attr];
									model[attr] = booleanAssign(attr, scope.initOptions[attr]);
								}
							});
						}

					}());
				}

				// Setup expression (&) options
				for(var $indexb = -1; ++$indexb < expressionKeys.length;){
					(function () {
						var attr = expressionKeys[$indexb];
						if( angular.isDefined(attrs[attr]) ){
							model[attr] = scope[attr];
						}
						else if ( angular.isDefined(initOptions[attr]) ) {
							var fnExp = initOptions[attr];
							var fn = $parse(fnExp);
							model[attr] = function (locals) {
								return fn(scope.$parent, locals);
							};
						}
						else if( angular.isDefined(attrDefaults[attr]) ){
							// model[attr] = attrDefaults[attr] || function () {/*some dummy function*/};
							// console.log("setting up the default action: " + attr);
							var fnExp = attrDefaults[attr];
							var fn = $parse(fnExp);
							model[attr] = function (locals) {
								return fn(scope.$parent, locals);
							};
						}
						else {
							model[attr] = function () {
								/*some dummy function*/
								console.log("dummy function");
							};
						}

					}());
				}
			}
		};

		return directiveInitializer;
	}
]);