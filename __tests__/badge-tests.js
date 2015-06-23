jest.dontMock('../src/js/badge.js');

describe('Badge', function () {
    var React,
        Badge,
        TestUtils,
        testBadge;

    beforeEach(function () {
        React = require('react/addons'),
            Badge = require('../src/js/badge.js'),
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
    
    it ('badge properties should exist', function () {
        expect(testBadge).toBeDefined();
        expect(testBadge.id).toBeDefined();
        expect(testBadge.name).toBeDefined();
        expect(testBadge.url).toBeDefined();
        expect(testBadge.comment).toBeDefined();
        expect(testBadge.titleTag).toBeDefined();
        expect(testBadge.link).toBeDefined();
        expect(testBadge.createdAt).toBeDefined();
        expect(testBadge.updatedAt).toBeDefined();
        expect(testBadge.categoryTags).toBeDefined();
    });
});