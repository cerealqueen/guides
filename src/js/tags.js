var React = require('react');

var Tags = React.createClass({
    render: function() {
        var tags = this.props.tags,
            tagString;
        if (tags.length === 0)
            tagString = 'No tags';
        else
            tagString = tags.join(', ');
        return (
            <div className="tag">
            Tags: {tagString}
            </div>
        );
    }
});

module.exports = Tags;