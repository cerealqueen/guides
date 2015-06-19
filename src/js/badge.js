var React = require('react');
var BadgeImg = require('./badgeimg');
var BadgeInfo = require('./badgeinfo');
var Tags = require('./tags');

module.exports = React.createClass({
    render: function() {
        var badgeObj = this.props.badges,
            isGroup = badgeObj.badges !== undefined,
            thisYear = undefined,
            lastYear = undefined,
            dividerClassList = 'divider';
        if (isGroup) {
            thisYear = badgeObj.badges[badgeObj.badges.length - 1].created_at.getFullYear();
        } else {
            thisYear = badgeObj.created_at.getFullYear();
        }
        if (this.props.lastDate)
            lastYear = this.props.lastDate.getFullYear();
        var isNewYear = lastYear && thisYear !== lastYear;
        var newYear = '';
        if (isNewYear) {
            dividerClassList += ' newYear';
            newYear = this.props.isDescending ? lastYear : thisYear;
        }
        return (
            <div>
            <div className={dividerClassList}>{newYear}</div>
            <div className="badgeContainer">
            <div className="badgeItem">
            <BadgeImg badge={badgeObj} />
            <BadgeInfo badge={badgeObj} />
            <Tags tags={isGroup ? badgeObj.badges[badgeObj.badges.length - 1].category_tags : badgeObj.category_tags} />
            </div>
            </div>
            </div>
        );
    }
});