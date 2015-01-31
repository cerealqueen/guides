(function (angular) {
	'use strict';
	
angular.
module('BadgeGuideApp', ['ngRoute', 'ngMaterial']).
factory('Badge', function ($http) {
		var badges = [];
		$http.get('js/badges.json')
			.success(function (data) {
			for (var i = 0; i < data.length; i++)
			{
				badges.push(data[i]);
			}
			}).error(function (data, status, error, config) {
				badges.push({
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
			//badges.push({id:0, name:"dingle", URL:"http://starmen.net/badgevatars/avatars/rofishspy.png", comment:"corner", title_tag:"what"});
			return badges;
	}).
	controller('badgesController', ['$scope', '$mdSidenav', 'Badge', function ($scope, $mdSidenav, Badge) {
		$scope.badgeFilter = null;
		$scope.forumsUrl = 'http://forum.starmen.net/forum';
		$scope.badgeList = Badge;
		 
		$scope.searchFilter = function (badge) {
			var keyword = new RegExp($scope.badgeFilter, 'i');
			return !$scope.badgeFilter || keyword.test(badge.name) || keyword.test(badge.title);
		};
		$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};
	}]);
}(window.angular));