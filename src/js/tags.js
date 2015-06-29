var React = require('react');

var Tags = React.createClass({
    render: function() {
        var tags = this.props.tags,
            tagString = tags.length >= 1 ? tags.join(', ') : 'No tags';
        return (
            <div className="tag">
            Tags: {tagString}
            </div>
        );
    }
});

module.exports = Tags;