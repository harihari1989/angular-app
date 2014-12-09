angular.module('services.resourceDictionary', [
	'services.dictionary',
	'underscore'
]);

angular.module('services.resourceDictionary').factory('resourceDictionary', [
	'dictionary',
	'_',
	'$injector',
	// function ( dictionaryService, _ ) {
	function ( dictionaryService, _, $injector ) {

		// console.log("the dictionary service");
		// console.log(JSON.stringify(dictionaryService));

		var dictionaryFactory = function (label, idFunction) {

			// dictionary service is not being injected due
			// some circular dependency (have to this figure out),
			// for now explicitly injecting the service via
			// injector
			dictionaryService = $injector.get('dictionary');
			// console.log("the dictionary service");
			// console.log(dictionaryService.toString());
			// console.log(dictionaryService);

			var dictionary = dictionaryService(label);

			var resourceDictionaryService = {
				init: function (idFunction) {
					this.initIdFunction(idFunction);
				},
				initIdFunction: function (idFunction) {
					if( angular.isDefined(idFunction)
					 && angular.isFunction(idFunction) ){
						this.getId = idFunction;
					}
				},
				getId: function (value) {
					return value.$id();
				},
				setItem: function (item, noForce) {
					var key = this.getId(item);
					if( noForce && this.lookUpItem(key) ){
						return;
					}
					dictionary.set(key, item);
				},
				setItems: function (items, force) {
					var that = this;
					var keyValueMap = {};
					angular.forEach(items, function(item) {
						var key = that.getId(item);
						if( !keyValueMap[key] || (force && keyValueMap[key]) ){
							keyValueMap[key] = item;
						}
					});
					dictionary.setList(keyValueMap, force);
				},
				clearItem: function (item) {
					var key = this.getId(item);
					dictionary.clear(key);
				},
				clearItems: function (items) {
					var that = this;
					angular.forEach(items, function(item) {
						that.clearItem(item);
					});
				},
				lookUpItem: function (itemId) {
					return dictionary.lookUp(itemId);
				},
				lookUpItems: function (itemsIdList) {
					return dictionary.lookUpList(itemsIdList);
				},
				getDictionary: function () {
					return dictionary.getLookUp();
				}

			};

			resourceDictionaryService.init(idFunction);

			return resourceDictionaryService;
		};
		return dictionaryFactory;
	}
]);