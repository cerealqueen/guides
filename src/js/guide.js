var React = require('react');
var NavBar = require('./navbar');
var BadgeList = require('./badgelist');
var Badge = require('./badge');

var BADGES = [];

var Guide = React.createClass({
    loadBadgeFile: function () {
        $.ajax({
            url: this.props.badgeUrl,
            dataType: 'json',
            cache: true,
            success: function (data) {
                this.loadFilters(data.filtered_badges || []);
                this.loadGroups(data.groups || {});
                this.loadBadges(data.badges || []);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadBadges: function (data) {
        if (data === undefined || data.length === 0) {
            throw new Error('no badges could be found for loading');
        }
        var groupInfo = this.state.groups;
        var badgeThings = data.map(function (b, i) {
            if ($.inArray(b.id, this.state.filter) === -1) {
                var badge = new Badge(b);
                if (b.group_id) {
                    if (!groupInfo || !groupInfo[b.group_id])
                        throw new Error('group structure for ' + b.group_id + 'could not be located');
                    if (groupInfo[b.group_id].badges === undefined)
                        groupInfo[b.group_id].badges = [];
                    groupInfo[b.group_id].badges.push(badge);
                    groupInfo[b.group_id].badges.sort(function (badgeA, badgeB) {
                        return badgeA.createdAt - badgeB.createdAt;
                    });
                } else {
                    return badge;
                }
            }
        }, this);
        BADGES = badgeThings.filter(function (o) {return o;});
        var groups = [];
        for (var groupName in groupInfo) {
            if (groupInfo.hasOwnProperty(groupName)) {
                var groupData = groupInfo[groupName];
                var groupItem = {
                    name: groupName,
                    title: groupData.title,
                    badges: groupData.badges,
                    isGroup: true,
                    createdAt: groupData.badges[groupData.badges.length - 1].createdAt
                };
                var categoryTags = [];
                groupItem.badges.forEach(function (badge) {
                    categoryTags.concat(badge.categoryTags || []);
                });
                groupItem.categoryTags = $.unique(categoryTags);
                groups.push(groupItem);
            }
        }
        $.merge(BADGES, groups);
        BADGES.sort(this.sortBadges);
        this.setState({isDoneLoading: true});
    },
    loadFilters: function (data) {
        if (!data || !data.length)
            return;
        var filters = data.slice();
        filters.sort();
        this.setState({filter:filters});
    },
    loadGroups: function (data) {
        if (!data)
            return;
        this.setState({groups:data});
    },
    getInitialState: function () {
        return {
            filterText: '',
            isDoneLoading: false,
            isDescending: true
        };
    },
    componentDidMount: function() {
        this.loadBadgeFile();
    },
    sortBadges: function (badgeA, badgeB) {
        var dateA = badgeA.createdAt,
            dateB = badgeB.createdAt;
        if (this.state.isDescending) {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        };
    },
    handleUserInput: function (filterText) {
        this.setState({
            filterText: filterText
        });
    },
    handleSortDirectionSwitch: function (e) {
        this.setState({isDescending: !this.state.isDescending || false});
        BADGES.sort(this.sortBadges);
    },
    render: function () {
        if (this.state.isDoneLoading)
        {
            return (
                <div>
                <NavBar filterText={this.state.filterText} onUserType={this.handleUserInput} />
                <BadgeList badges={BADGES} filterText={this.state.filterText} isDescending={this.state.isDescending} switchDirection={this.handleSortDirectionSwitch} />
                </div>
            );
        } else {
            return (
                <div>
                <NavBar filterText={this.state.filterText} onUserType={this.handleUserInput} />
                <div className="loading"><i className="fa fa-spinner fa-spin fa-2x"></i></div>
                </div>
            );
        }
    }
});

module.exports = Guide;