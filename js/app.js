(function (angular) {
	'use strict';
	
	var app = angular.module('BadgeGuideApp', ['ngRoute', 'ngMaterial', 'ngAnimate']);

	app.factory('LoadBadges', function ($http) {
		return $http.get('js/badges.json');
	});

	app.controller('badgesController', ['$scope', '$mdSidenav', 'LoadBadges', function ($scope, $mdSidenav, LoadBadges) {
		$scope.searchText = null;
		$scope.forumsUrl = 'http://forum.starmen.net/forum';
		$scope.doneloading = false;
		
		//Initialize data
		$scope.badgeList = [];
		LoadBadges.success(function (data) {
			for (var i = 0; i < data.length; i++)
			{
				$scope.badgeList.push(data[i]);
			}
			$scope.doneloading = true;
		}).error(function (data, status, error, config) {
			$scope.badgeList.push({
				id:0,
				name:error,
				URL:"http://starmen.net/badgevatars/avatars/rofishspy.png",
				comment:config,
				title_tag:"",
				link:"",
				created_at:"",
				updated_at:""
			});
		});

		// Filters
		$scope.badgeFilter = function (badge) {
			return (badge.name && badge.URL);
		};
		$scope.searchFilter = function (badge) {
			var keyword = new RegExp($scope.searchText, 'i');
			return !$scope.searchText || keyword.test(badge.name) || keyword.test(badge.title) || keyword.test(badge.comment) || keyword.test(badge.category_tags);
		};
		$scope.dateFilter = function (badge) {
			return parseInt(badge.created_at);
		};

		//Controls
		/*$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};*/
	}]);
}(window.angular));