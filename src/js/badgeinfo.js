var React = require('react');

module.exports = React.createClass({
    getInfo: function (badge) {
        return (
            <li>
            {badge.name}<br />
            {badge.comment}
            </li>
        );
    },
    render: function () {
        var isGroup = this.props.badge.badges !== undefined;
        if (isGroup) {
            var badgeGroup = this.props.badge;
            var individualInfos = badgeGroup.badges.map(this.getInfo);
            return (
                <div className="block">
                <h3>{badgeGroup.title}</h3>
                <ul className="badgeGroup">
                {individualInfos}
                </ul>
                </div>
            );
        } else {
            var badge = this.props.badge;
            return (
                <div className="block">
                <h3>{badge.name}</h3>
                <p>{badge.comment}</p>
                </div>
            );
        }
    }
});