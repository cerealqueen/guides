var React = require('react');
var BadgeImg = require('./badgeimg');
var BadgeInfo = require('./badgeinfo');
var Tags = require('./tags');

var BadgeItem = React.createClass({
    render: function() {
        var badgeObj = this.props.badges,
            dividerClassList = 'divider',
            lastYear,
            thisYear;
        if (badgeObj.createdAt)
            thisYear = badgeObj.createdAt.getFullYear();
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
            <Tags tags={badgeObj.categoryTags} />
            </div>
            </div>
            </div>
        );
    }
});

module.exports = BadgeItem;