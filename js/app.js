var Tags = React.createClass({
    render: function() {
        var tags = this.props.tags || [],
            tagString = '';
        if (tags.length == 0)
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

var BadgeImg = React.createClass({
    createImg: function (badge) {
        if (badge.link) {
            return <a href={badge.link}><img className="badgeImg" src={badge.URL} alt={badge.title} onload="this.style.opacity='1';" /></a>
        } else {
            return <img className="badgeImg" src={badge.URL} alt={badge.title} onload="this.style.opacity='1';" />;
        }
    },
    render: function() {
        var imgContainer = undefined;
        var isGroup = this.props.badge.badges !== undefined;
        if (isGroup) {
            imgContainer = this.props.badge.badges.map(this.createImg);
        } else {
            imgContainer = this.createImg(this.props.badge);
        }
        return (
            <div className="badgeImgContainer">
            {imgContainer}
            </div>
        );
    }
});

var BadgeInfo = React.createClass({
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

var Badge = React.createClass({
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

var BadgeList = React.createClass({
    getInitialState: function() {
        return {
            isDescending: true
        };
    },
    handleDirection: function(e) {
        this.setState({isDescending: !this.state.isDescending || false});

    },
    isMatch: function (badge) {
        var regexFilter = new RegExp(this.props.filterText, 'i');
        return regexFilter.test(badge.name) || 
            regexFilter.test(badge.title) || 
            regexFilter.test(badge.comment) || 
            regexFilter.test(badge.category_tags) ||
            regexFilter.test(badge.created_at.getFullYear());
    },
    render: function() {
        var firstIndex = undefined;
        var badgeNodes = [];
        this.props.badges.sort(function (badgeA, badgeB) {
            var dateA = undefined,
                dateB = undefined;
            if (badgeA.badges)
                dateA = badgeA.badges[badgeA.badges.length - 1].created_at;
            else
                dateA = badgeA.created_at;
            if (badgeB.badges)
                dateB = badgeB.badges[badgeB.badges.length - 1].created_at;
            else
                dateB = badgeB.created_at;
            if (this.state.isDescending)
                return dateB - dateA;
            else
                return dateA - dateB;
        }.bind(this));
        this.props.badges.forEach(function (badge, index, badgesArr) {
            if (badge === undefined)
                return;
            var isGroup = badge.badges !== undefined;

            var lastDate = undefined;
            if (firstIndex !== undefined) {
                var lastIndex = index - 1;
                if (lastIndex < 0) lastIndex = 0;
                var lastBadge = badgesArr[lastIndex];
                if (lastBadge) {
                    if (lastBadge.badges)
                        lastDate = lastBadge.badges[lastBadge.badges.length - 1].created_at;
                    else
                        lastDate = lastBadge.created_at;
                }
            }
            if (this.props.filterText) {
                if (isGroup) {
                    var i = 0,
                        len = badge.badges.length;
                    while (i < len) {
                        if (this.isMatch(badge.badges[i])) {
                            badgeNodes.push (
                                <Badge badges={badge} lastDate={lastDate} isDescending={this.state.isDescending} key={badge.id} />
                            );
                            break;
                        }
                        i++;
                    }
                } else {
                    if (this.isMatch(badge)) {
                        badgeNodes.push (
                            <Badge badges={badge} lastDate={lastDate} isDescending={this.state.isDescending} key={badge.id} />
                        );
                    }
                }
            } else {
                badgeNodes.push (
                    <Badge badges={badge} lastDate={lastDate} isDescending={this.state.isDescending} key={badge.id} />
                );
            }
            firstIndex = index;
        }, this);
        var directionIcon = 'fa ' + (this.state.isDescending ? 'fa-caret-down' : 'fa-caret-up');
        return (
            <div>
            <div className="sortContainer">
            By Creation Date:
            <div className="direction" onClick={this.handleDirection}>
            <i className={directionIcon} /> {this.state.isDescending ? 'Descending' : 'Ascending'}
            </div>
            </div>
            <div className="badgeList">
            {badgeNodes}
            </div>
            </div>
        );
    }
});

var NavBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value);
    },
    render: function () {
        return (
            <header>
            <div className="navbar">
            <ul>
            <li className="links">
            <a className="starmen" href="http://starmen.net"><img src="http://local-static3.forum-files.fobby.net/forum_attachments/0030/1383/chompy_mod.gif" alt="Starmen.net"/></a>
            </li>
            <li className="search">
            <input type="search" placeholder="Search" value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange} />
            </li>
            </ul>
            <a className="github" href="https://github.com/aaronsky500/starmen-badge-guide"><i className="fa fa-github fa-2x"></i></a>
            </div>
            </header>
        );
    }
});

var Guide = React.createClass({
    loadBadgeFile: function() {
        $.ajax({
            url: this.props.badgeUrl,
            dataType: 'json',
            cache: true,
            success: function(data) {
                this.loadFilters(data.filtered_badges || []);
                this.loadGroups(data.groups || {});
                this.loadBadges(data.badges || []);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });   
    },
    loadBadges: function(data) {
        if (data === undefined || data.length === 0)
            return;
        var groupInfo = this.state.groups;
        var badges = data.map(function (b, i) {
            if (b && b.name && b.URL && $.inArray(b.id, this.state.filter) === -1) {
                if (b.updated_at)
                    b.updated_at = new Date(b.updated_at.replace(/\s/, 'T'));
                if (b.created_at)
                    b.created_at = new Date(b.created_at.replace(/\s/, 'T'));
                if (b.group_id && groupInfo[b.group_id]) {
                    if (groupInfo[b.group_id].badges === undefined)
                        groupInfo[b.group_id].badges = [];
                    groupInfo[b.group_id].badges.push(b);
                    groupInfo[b.group_id].badges.sort(function (badgeA, badgeB) {
                        return badgeA.created_at - badgeB.created_at;
                    });
                    return;
                }
                return b;
            }
        }, this);

        var groups = [];
        for (var groupName in groupInfo) {
            if (groupInfo.hasOwnProperty(groupName)) {
                var groupData = groupInfo[groupName];
                groups.push(
                    {
                        "name": groupName,
                        "title": groupData.title,
                        "badges": groupData.badges
                    }
                );
            }
        }
        $.merge(badges, groups);
        this.setState({badges: badges});
    },
    loadFilters: function(data) {
        if (data === undefined || data.length === 0)
            return;
        var filters = data.slice();
        filters.sort();
        this.setState({filter:filters});
    },
    loadGroups: function(data) {
        if (data === undefined)
            return;
        this.setState({groups:data});
    },
    getInitialState: function() {
        return {
            filterText: ''
        };
    },
    componentDidMount: function() {
        this.loadBadgeFile();
    },
    handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText
        });
    },
    render: function () {
        if (this.state.badges)
        {
            return (
                <div>
                <NavBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                <BadgeList badges={this.state.badges} groups={this.state.groups} filterText={this.state.filterText} />
                </div>
            );
        } else {
            return (
                <div>
                <NavBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                <div className="loading"><i className="fa fa-spinner fa-spin fa-2x"></i></div>
                </div>
            );
        }
    }
});

React.render(
    <Guide badgeUrl="js/badges.json" />,
    document.getElementById('content')
);
