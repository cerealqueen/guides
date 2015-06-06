var dividerStyle = {
    color: 'black',
    display: 'block',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    margin: '0 0 0 10'
};

var Badge = React.createClass({
    render: function() {
        var badgeObj = this.props.badge;
        return (
            <div className="badgeItem">
            <div>
            <a href={badgeObj.link}>
            <img src={badgeObj.URL} alt={badgeObj.title} />
            </a>
            </div>
            <div style={{padding:'8px'}}></div>
            <div>
            <h3>{badgeObj.name}</h3>
            <p>{badgeObj.comment}</p>
            </div>
            <div>
            <p style={{fontStyle:'italic'}}>
            Tags: {badgeObj.category_tags}
            </p>
            </div>
            <div style={dividerStyle}></div>
            </div>
        );
    }
});

var BadgeList = React.createClass({
    render: function() {
        var badgeNodes = this.props.data.map(function(badge, index) {
            return (
                <Badge badge={badge} key={index}></Badge> 
            );
        });
        return (
            <div className="badgeList">
            {badgeNodes}
            </div>
        );
    }
});

var BadgeContainer = React.createClass({
    loadBadges: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var i = 0, 
                    len = data.length, 
                    badges = [];
                while(i < len)
                {
                    var b = data[i]
                    if (b.name && b.URL)
                        badges.push(b);
                    i++;
                }
                badges.sort(function (badgeA, badgeB) {
                    if (badgeA.updated_at) {
                        badgeA.updated_at = Date.parse(badgeA.updated_at);
                    }
                    if (badgeB.updated_at) {
                        badgeB.updated_at = Date.parse(badgeB.updated_at);
                    }
                    if (badgeA.created_at && badgeB.created_at) {
                        badgeA.created_at = Date.parse(badgeA.created_at);
                        badgeB.created_at = Date.parse(badgeB.created_at);
                        return badgeB.created_at - badgeB.created_at;
                    }
                    return 0;
                });
                this.setState({data: badges});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadBadges();
    },
    render: function () {
        return (
            <div className="badgeContainer">
            <BadgeList data={this.state.data} />
            </div>
        );
    }
});

React.render(
    <BadgeContainer url="js/badges.json" />,
    document.getElementById('content')
);




//(function (angular) {
//	'use strict';
//	
//	var app = angular.module('BadgeGuideApp', ['ngRoute', 'ngMaterial', 'ngAnimate']);
//
//	app.factory('LoadBadges', function ($http) {
//		return $http.get('js/badges.json');
//	});
//
//	app.controller('badgesController', ['$scope', '$mdSidenav', 'LoadBadges', function ($scope, $mdSidenav, LoadBadges) {
//		$scope.searchText = null;
//		$scope.forumsUrl = 'http://forum.starmen.net/forum';
//		$scope.doneloading = false;
//		
//		//Initialize data
//		$scope.badgeList = [];
//		LoadBadges.success(function (data) {
//			for (var i = 0; i < data.length; i++)
//			{
//				$scope.badgeList.push(data[i]);
//			}
//			$scope.doneloading = true;
//		}).error(function (data, status, error, config) {
//			$scope.badgeList.push({
//				id:0,
//				name:error,
//				URL:"http://starmen.net/badgevatars/avatars/rofishspy.png",
//				comment:config,
//				title_tag:"",
//				link:"",
//				created_at:"",
//				updated_at:""
//			});
//		});
//
//		// Filters
//		$scope.badgeFilter = function (badge) {
//			return (badge.name && badge.URL);
//		};
//		$scope.searchFilter = function (badge) {
//			var keyword = new RegExp($scope.searchText, 'i');
//			return !$scope.searchText || keyword.test(badge.name) || keyword.test(badge.title) || keyword.test(badge.comment) || keyword.test(badge.category_tags);
//		};
//		$scope.dateFilter = function (badge) {
//			return parseInt(badge.created_at);
//		};
//
//		//Controls
//		/*$scope.toggleSidenav = function(menuId) {
//			$mdSidenav(menuId).toggle();
//		};*/
//	}]);
//}(window.angular));