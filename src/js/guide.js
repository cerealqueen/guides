var React = require('react');
var NavBar = require('./navbar');
var BadgeList = require('./badgelist');

module.exports = React.createClass({
    loadBadgeFile: function() {
        $.ajax({
            url: this.props.badgeUrl,
            dataType: 'json',
            cache: true,
            success: function(data) {
                this.loadFilters(data.filtered_badges || []);
                this.loadGroups(data.groups || {});
                this.loadBadges(data.badges || []);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });   
    },
    loadBadges: function(data) {
        if (data === undefined || data.length === 0)
            return;
        var groupInfo = this.state.groups;
        var badges = data.map(function (b, i) {
            if (b && b.name && b.URL && $.inArray(b.id, this.state.filter) === -1) {
                if (b.updated_at)
                    b.updated_at = new Date(b.updated_at.replace(/\s/, 'T'));
                if (b.created_at)
                    b.created_at = new Date(b.created_at.replace(/\s/, 'T'));
                if (b.group_id && groupInfo[b.group_id]) {
                    if (groupInfo[b.group_id].badges === undefined)
                        groupInfo[b.group_id].badges = [];
                    groupInfo[b.group_id].badges.push(b);
                    groupInfo[b.group_id].badges.sort(function (badgeA, badgeB) {
                        return badgeA.created_at - badgeB.created_at;
                    });
                    return;
                }
                return b;
            }
        }, this);

        var groups = [];
        for (var groupName in groupInfo) {
            if (groupInfo.hasOwnProperty(groupName)) {
                var groupData = groupInfo[groupName];
                groups.push(
                    {
                        "name": groupName,
                        "title": groupData.title,
                        "badges": groupData.badges
                    }
                );
            }
        }
        $.merge(badges, groups);
        this.setState({badges: badges});
    },
    loadFilters: function(data) {
        if (data === undefined || data.length === 0)
            return;
        var filters = data.slice();
        filters.sort();
        this.setState({filter:filters});
    },
    loadGroups: function(data) {
        if (data === undefined)
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