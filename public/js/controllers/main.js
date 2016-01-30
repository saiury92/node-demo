angular.module('feedController', [])

	// inject the Feed service factory into our controller
	.controller('mainController', ['$scope','$http','Feeds', function($scope, $http, Feeds) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all feeds and show them
		// use the service to get all the feeds
		Feeds.get()
			.success(function(data) {
				$scope.feeds = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFeed = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Feeds.create($scope.formData)

					// if successful creation, call our get function to get all the new feeds
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.feeds = data; // assign our new list of feeds
					});
			}
		};

		// DELETE ==================================================================
		// delete a feed after checking it
		$scope.deleteFeed= function(id) {
			$scope.loading = true;

			Feeds.delete(id)
				// if successful creation, call our get function to get all the new feeds
				.success(function(data) {
					$scope.loading = false;
					$scope.feeds = data; // assign our new list of feeds
				});
		};
	}]);