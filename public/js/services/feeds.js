'use strict';

angular.module('feedService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Feeds', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/feeds');
			},
			create : function(feedData) {
				return $http.post('/api/feeds', feedData);
			},
			delete : function(id) {
				return $http.delete('/api/feeds/' + id);
			}
		}
	}]);