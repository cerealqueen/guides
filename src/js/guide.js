var React = require('react');
var NavBar = require('./navbar');
var BadgeList = require('./badgelist');
var Badge = require('./badge');

module.exports = React.createClass({
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
        var badges = data.map(function (b, i) {
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
                
                groups.push(groupItem);
            }
        }
        $.merge(badges, groups);
        this.setState({badges: badges});
    },
    loadFilters: function(data) {
        if (!data || !data.length)
            return;
        var filters = data.slice();
        filters.sort();
        this.setState({filter:filters});
    },
    loadGroups: function(data) {
        if (!data)
            return;
        this.setState({groups:data});
    },
    getInitialState: function() {
        return {
            filterText: ''
        };
    },
    componentDidMount: function() {
        this.loadBadgeFile();
    },
    handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText
        });
    },
    render: function () {
        if (this.state.badges)
        {
            return (
                <div>
                <NavBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                <BadgeList badges={this.state.badges} groups={this.state.groups} filterText={this.state.filterText} />
                </div>
            );
        } else {
            return (
                <div>
                <NavBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                <div className="loading"><i className="fa fa-spinner fa-spin fa-2x"></i></div>
                </div>
            );
        }
    }
});