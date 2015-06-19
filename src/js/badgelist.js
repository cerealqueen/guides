var React = require('react');
var Badge = require('./badge');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            isDescending: true
        };
    },
    handleDirection: function(e) {
        this.setState({isDescending: !this.state.isDescending || false});
    },
    isMatch: function (badge) {
        var regexFilter = new RegExp(this.props.filterText, 'i');
        return regexFilter.test(badge.name) || 
            regexFilter.test(badge.title) || 
            regexFilter.test(badge.comment) || 
            regexFilter.test(badge.category_tags) ||
            regexFilter.test(badge.created_at.getFullYear());
    },
    sortBadges: function (badgeA, badgeB) {
        var dateA = undefined,
            dateB = undefined;
        if (badgeA.badges)
            dateA = badgeA.badges[badgeA.badges.length - 1].created_at;
        else
            dateA = badgeA.created_at;
        if (badgeB.badges)
            dateB = badgeB.badges[badgeB.badges.length - 1].created_at;
        else
            dateB = badgeB.created_at;
        if (this.state.isDescending)
            return dateB - dateA;
        else
            return dateA - dateB;
    },
    render: function() { 
        var firstIndex = undefined,
            badgeNodes = [], 
            badges = this.props.badges; 
        badges.sort(this.sortBadges.bind(this));
        badgeNodes = badges.map(function (badge, index, badges) {
            if (badge === undefined)
                return;
            var isGroup = badge.badges !== undefined;
            var lastDate = undefined;
            if (firstIndex !== undefined) {
                var lastIndex = index - 1;
                if (lastIndex < 0) lastIndex = 0;
                var lastBadge = badgesArr[lastIndex];
                if (lastBadge) {
                    if (lastBadge.badges)
                        lastDate = lastBadge.badges[lastBadge.badges.length - 1].created_at;
                    else
                        lastDate = lastBadge.created_at;
                }
            }
            if (this.props.filterText) {
                if (isGroup) {
                    var i = 0,
                        len = badge.badges.length;
                    while (i < len) {
                        if (this.isMatch(badge.badges[i])) {
                            return (
                                <Badge badges={badge} lastDate={lastDate} isDescending={this.state.isDescending} key={badge.id} />
                            );
                            break;
                        }
                        i++;
                    }
                } else {
                    if (this.isMatch(badge)) {
                        return (
                            <Badge badges={badge} lastDate={lastDate} isDescending={this.state.isDescending} key={badge.id} />
                        );
                    }
                }
            } else {
                return (
                    <Badge badges={badge} lastDate={lastDate} isDescending={this.state.isDescending} key={badge.id} />
                );
            }
            firstIndex = index;
        }, this);
        var directionIcon = 'fa ' + (this.state.isDescending ? 'fa-caret-down' : 'fa-caret-up');
        return (
            <div>
            <div className="sortContainer">
            By Creation Date:
            <div className="direction" onClick={this.handleDirection}>
            <i className={directionIcon} /> {this.state.isDescending ? 'Descending' : 'Ascending'}
            </div>
            </div>
            <div className="badgeList">
            {badgeNodes}
            </div>
            </div>
        );
    }
});