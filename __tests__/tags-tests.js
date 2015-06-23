jest.dontMock('../src/js/tags.js');
describe('Tags', function () {
    var React,
        Tags,
        TestUtils;

    beforeEach(function () {
        React = require('react/addons'),
            Tags = require('../src/js/tags.js'),
            TestUtils = React.addons.TestUtils;
    });

    afterEach(function (done) {
        React.unmountComponentAtNode(document.body);
        document.body.innerHTML = "";
        setTimeout(done);
    });

    it ('displays tags info for given badge', function () {
        var tagItems = ['unobtainable', 'unique', 'funfests', 'current']
        var item = TestUtils.renderIntoDocument(
            <Tags tags={tagItems} />
        );
        var tags = TestUtils.findRenderedDOMComponentWithClass(item, 'tag');
        expect(tags.getDOMNode().textContent).toEqual('Tags: unobtainable, unique, funfests, current');

    })
});