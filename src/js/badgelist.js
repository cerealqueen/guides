var React = require('react');
var BadgeItem = require('./badgeitem');

var BadgeList = React.createClass({
    isMatch: function (badge) {
        var regexFilter = new RegExp(this.props.filterText, 'i');
        return regexFilter.test(badge.name) ||
            regexFilter.test(badge.title) ||
            regexFilter.test(badge.comment) ||
            regexFilter.test(badge.categoryTags) ||
            regexFilter.test(badge.createdAt.getFullYear());
    },
    processBadges: function (badge, index, badges) {
        if (!badge) {
            return;
        }
        var lastBadge = badges[index - 1],
            lastDate;
        if (lastBadge) {
            lastDate = lastBadge.createdAt;
        }
        if (this.props.filterText) {
            if (badge.isGroup) {
                if (this.isMatch(badge)) {
                    return (
                        <BadgeItem badges={badge} lastDate={lastDate} isDescending={this.props.isDescending} key={badge.id} />
                    );
                } else {
                    var i = 0,
                        len = badge.badges.length,
                        b;
                    while (i < len) {
                        b = badge.badges[i];
                        if (this.isMatch(b))
                            return (
                                <BadgeItem badges={badge} lastDate={lastDate} isDescending={this.props.isDescending} key={b.id} />
                            );
                        i++;
                    }
                }
            } else if (this.isMatch(badge)) {
                return (
                    <BadgeItem badges={badge} lastDate={lastDate} isDescending={this.props.isDescending} key={badge.id} />
                );
            }
        } else {
            return (
                <BadgeItem badges={badge} lastDate={lastDate} isDescending={this.props.isDescending} key={badge.id} />
            );
        }
    },
    render: function() {
        var directionIcon = 'fa ' + (this.props.isDescending ? 'fa-caret-down' : 'fa-caret-up');
        return (
            <div>
            <div className="sortContainer">
            By Creation Date:
            <div className="direction" onClick={this.props.switchDirection}>
            <i className={directionIcon} /> {this.props.isDescending ? 'Descending' : 'Ascending'}
            </div>
            </div>
            <div className="badgeList">
            {this.props.badges.map(this.processBadges)}
            </div>
            </div>
        );
    }
});

module.exports = BadgeList;