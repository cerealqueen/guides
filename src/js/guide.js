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
                
                var isDescending = this.state.isDescending;
                BADGES.sort(function (badgeA, badgeB) {
                    if (isDescending) {
                        return badgeB.id - badgeA.id;
                    } else {
                        return badgeA.id - badgeB.id;
                    }
                });
                
                this.setState({isDoneLoading: true});
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
                groupData.badges.sort(function (badgeA, badgeB) {
                    return badgeA.createdAt - badgeB.createdAt;
                });
                var lastBadgeInGroup = groupData.badges[groupData.badges.length - 1];
                var groupItem = {
                    id: lastBadgeInGroup.id,
                    name: groupName,
                    title: groupData.title,
                    badges: groupData.badges,
                    isGroup: true,
                    createdAt: lastBadgeInGroup.createdAt
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
    handleUserInput: function (filterText) {
        this.setState({
            filterText: filterText
        });
    },
    handleSortDirectionSwitch: function (e) {
        var isDescending = !this.state.isDescending || false;
        BADGES.sort(function (badgeA, badgeB) {
            if (isDescending) {
                return badgeB.id - badgeA.id;
            } else {
                return badgeA.id - badgeB.id;
            }
        });
        this.setState({isDescending:isDescending});
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