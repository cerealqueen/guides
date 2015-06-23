var React = require('react');

var BadgeInfo = React.createClass({
    getInfo: function (badge) {
        return (
            <li key={badge.id}>
            {badge.name}<br />
            {badge.comment}
            </li>
        );
    },
    render: function () {
        var badge = this.props.badge;
        if (badge.isGroup) {
            var individualInfos = badge.badges.map(this.getInfo);
            return (
                <div className="block">
                <h3>{badge.title}</h3>
                <ul className="badgeGroup">
                {individualInfos}
                </ul>
                </div>
            );
        } else {
            return (
                <div className="block">
                <h3>{badge.name}</h3>
                <p>{badge.comment}</p>
                </div>
            );
        }
    }
});

module.exports = BadgeInfo;