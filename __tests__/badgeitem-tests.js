jest.dontMock('../src/js/badgeitem.js');
jest.dontMock('../src/js/badgeinfo.js');
jest.dontMock('../src/js/badge.js');
describe('BadgeItem', function () {
    var React,
        Badge,
        BadgeItem,
        TestUtils,
        testBadge;

    beforeEach(function () {
        React = require('react/addons'),
            Badge = require('../src/js/badge.js'),
            BadgeItem = require('../src/js/badgeitem.js'),
            TestUtils = React.addons.TestUtils,
            testBadge = new Badge({
            id: 276,
            name: "Chompy",
            URL: "http://local-static3.forum-files.fobby.net/forum_attachments/0030/1383/chompy_mod.gif",
            comment: "METC's All-Purpose Appreciation Badge, to be used sparingly at most",
            title_tag: "It's a Chomp. You've heard about Chomps before, I'm sure.",
            link: "",
            created_at: "2012-04-21 13:48:53",
            updated_at: "2012-05-03 19:24:34",
            category_tags: ["unobtainable"]
        });
    });

    afterEach(function (done) {
        React.unmountComponentAtNode(document.body);
        document.body.innerHTML = "";
        setTimeout(done);
    });

    it ('displays info for given badge', function () {
        var item = TestUtils.renderIntoDocument(
            <BadgeItem badges={testBadge} isDescending={true} key={testBadge.id} />
        );

        var info = TestUtils.findRenderedDOMComponentWithClass(item, 'block');
        expect(TestUtils.findRenderedDOMComponentWithTag(info, 'h3').getDOMNode().textContent).toEqual(testBadge.name);
        expect(TestUtils.findRenderedDOMComponentWithTag(info, 'p').getDOMNode().textContent).toEqual(testBadge.comment);

    });
});