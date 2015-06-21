var React = require('react');
var BadgeItem = require('./badgeitem');

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
            regexFilter.test(badge.categoryTags) ||
            regexFilter.test(badge.createdAt.getFullYear());
    },
    sortBadges: function (badgeA, badgeB) {
        var dateA = badgeA.badges ? badgeA.badges[badgeA.badges.length - 1].createdAt : badgeA.createdAt,
            dateB = badgeB.badges ? badgeB.badges[badgeB.badges.length - 1].createdAt : badgeB.createdAt;
        if (this.state.isDescending)
            return dateB - dateA;
        else
            return dateA - dateB;
    },
    processBadges: function (badge, index, badges) {
        if (!badge)
            return;
        var lastBadge = badges[index - 1],
            lastDate;
        if (lastBadge) {
            if (lastBadge.isGroup) {
                var len = lastBadge.badges.length - 1;
                lastDate = lastBadge.badges[len].createdAt;
            } else {
                lastDate = lastBadge.createdAt;
            }
        }
        if (this.props.filterText) {
            if (badge.isGroup) {
                if (this.isMatch(badge)) {
                    var i = 0,
                        len = badge.badges.length;
                    while (i < len) {
                        if (this.isMatch(badge.badges[i])) {
                            return (
                                <BadgeItem badges={badge} lastDate={lastDate} isDescending={this.state.isDescending} />
                            );
                        }
                        i++;
                    }
                }
            } else if (this.isMatch(badge)) {
                return (
                    <BadgeItem badges={badge} lastDate={lastDate} isDescending={this.state.isDescending} key={badge.id} />
                );
            } 
        } else {
            return (
                <BadgeItem badges={badge} lastDate={lastDate} isDescending={this.state.isDescending} key={badge.id} />
            );
        }
    },
    render: function() { 
        var badges = this.props.badges,
            badgeNodes = [];
        badges.sort(this.sortBadges);
        badgeNodes = badges.map(this.processBadges, this);
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