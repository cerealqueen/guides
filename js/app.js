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
    render: function() {
        var imgContainer = undefined;
        if (this.props.link) {
            imgContainer = <a href={this.props.link}><img className="badgeImg" src={this.props.url} alt={this.props.title} onload="this.style.opacity='1';" /></a>
        } else {
            imgContainer = <img className="badgeImg" src={this.props.url} alt={this.props.title} onload="this.style.opacity='1';" />;
        }
        return (
            <div className="badgeImgContainer">
            {imgContainer}
            </div>
        );
    }
});

var Badge = React.createClass({
    render: function() {
        var badgeObj = this.props.badge;
        var thisYear = badgeObj.created_at.getFullYear();
        var lastYear = undefined;
        if (this.props.lastDate)
            lastYear = this.props.lastDate.getFullYear();
        var dividerClassList = 'divider';
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
            <BadgeImg link={badgeObj.link} url={badgeObj.URL} title={badgeObj.title} />
            <div className="block">
            <h3>{badgeObj.name}</h3>
            <p>{badgeObj.comment}</p>
            </div>
            <Tags tags={badgeObj.category_tags} />
            </div>
            </div>
            </div>
        );
    }
});

var BadgeList = React.createClass({
    componentDidMount: function () {

    },
    getInitialState: function() {
        return {
            isDescending: true
        };
    },
    handleDirection: function(e) {
        this.setState({isDescending: !this.state.isDescending || false});

    },
    render: function() {
        var badgeNodes = [];
        this.props.badges.sort(function (badgeA, badgeB) {
            if (this.state.isDescending)
                return badgeB.created_at - badgeA.created_at;
            else
                return badgeA.created_at - badgeB.created_at;
        }.bind(this));
        this.props.badges.forEach(function (badge, index, badges) {

            var lastBadge = undefined;
            if (badgeNodes.length !== 0) {
                var lastIndex = index - 1;
                if (lastIndex < 0) lastIndex = 0;
                lastBadge = badges[lastIndex].created_at;
            }
            if (this.props.filterText) {
                var regexFilter = new RegExp(this.props.filterText, 'i');
                if (regexFilter.test(badge.name) || 
                    regexFilter.test(badge.title) || 
                    regexFilter.test(badge.comment) || 
                    regexFilter.test(badge.category_tags) ||
                    regexFilter.test(badge.created_at.getFullYear())) {
                    badgeNodes.push(
                        <Badge badge={badge} lastDate={lastBadge} isDescending={this.state.isDescending} key={badge.id} />
                    );
                }
            }
            else {
                badgeNodes.push(
                    <Badge badge={badge} lastDate={lastBadge} isDescending={this.state.isDescending} key={badge.id} />
                );
            }
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
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
        );
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
    loadFilter: function() {
        $.ajax({
            url: this.props.filterUrl,
            dataType: 'json',
            cache: true,
            success: function(data) {
                if (data.filtered_badges === undefined)
                    return;
                var i = 0,
                    len = data.filtered_badges.length,
                    filters = [];
                while (i < len)
                {
                    var f = data.filtered_badges[i];
                    if (f !== undefined)
                        filters.push(f);
                    i++;
                }
                filters.sort();
                this.setState({filter:filters});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadBadges: function() {
        $.ajax({
            url: this.props.badgeUrl,
            dataType: 'json',
            cache: true,
            success: function(data) {
                var i = 0, 
                    badgeData = data.badges,
                    groupData = data.groups,
                    len = badgeData.length, 
                    badges = [],
                    groups = [];
                while(i < len)
                {
                    var b = badgeData[i];
                    if (b.name && b.URL && $.inArray(b.id, this.state.filter) === -1) {
                        if (b.updated_at)
                            b.updated_at = new Date(b.updated_at.replace(/\s/, 'T'));
                        if (b.created_at)
                            b.created_at = new Date(b.created_at.replace(/\s/, 'T'));
                        badges.push(b);
                    }
                    i++;
                }
                this.setState({data: badges});
                len = groupData.length;
                i = 0;
                while (i < len) 
                {
                    var g = groupData[i];
                    if (g.badge_ids && g.badge_ids.length > 0)
                        groups.push(g);
                    i++;
                }
                this.setState({groups: groups});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            data: [],
            filter: [],
            filterText: ''
        };
    },
    componentDidMount: function() {
        this.loadFilter();
        this.loadBadges();
    },
    handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText
        });
    },
    render: function () {
        if (this.state.data && this.state.groups)
        {
            return (
                <div>
                <NavBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                <BadgeList badges={this.state.data} groups={this.state.groups}  filterText={this.state.filterText} />
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
    <Guide badgeUrl="js/badges.json" filterUrl="js/filter.json" />,
    document.getElementById('content')
);
