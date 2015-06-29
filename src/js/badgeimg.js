var React = require('react');

var BadgeImg = React.createClass({
    createImg: function (badge) {
        if (badge.link) {
            return <a key={badge.url} href={badge.link}><img className="badgeImg" src={badge.url} alt={badge.titleTag} /></a>
        } else {
            return <img key={badge.url} className="badgeImg" src={badge.url} alt={badge.titleTag} />;
        }
    },
    render: function() {
        var badge = this.props.badge;
        if (badge.isGroup)
            var imgContainer = badge.badges.map(this.createImg);
        else
            var imgContainer = this.createImg(badge);
        return (
            <div className="badgeImgContainer">
            {imgContainer}
            </div>
        );
    }
});

module.exports = BadgeImg;