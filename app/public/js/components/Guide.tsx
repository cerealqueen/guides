import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Navbar, SortDirection } from './navbar';
import { BadgeRow } from './badgerow';
import { Badge } from '../models';

interface GuideProps {
    badges?: Badge[]
}

interface GuideState {
    badges: Badge[];
    filter: string;
    sortDirection: SortDirection
    isLoading: boolean;
}

export class Guide extends React.Component<GuideProps, GuideState> {
    constructor(props) {
        super(props);
        
        this.state = {
            badges: [],
            filter: '',
            sortDirection: SortDirection.descending,
            isLoading: false
        };
        this.toggleDirection = this.toggleDirection.bind(this);
        this.onFilterInput = this.onFilterInput.bind(this);
        this.queryBadges = this.queryBadges.bind(this);
        this.sortBadges = this.sortBadges.bind(this);
        this.processBadges = this.processBadges.bind(this);
    }

    async componentDidMount() {
        const preloadedBadges = this.props.badges;
        const badges = await this.loadBadges(preloadedBadges);
        this.setState({
            badges,
            isLoading: false
        });
    }

    async loadBadges(preloadedBadges?: Badge[]) {
        let badges: Badge[] = null;
        if (preloadedBadges && preloadedBadges.length > 0) {
            badges = preloadedBadges.map(data => new Badge(data));
        } else {
            this.setState({
                isLoading: true
            });
            badges = [];
        }
        return badges;
    }

    toggleDirection() {
        const direction = this.state.sortDirection;
        let newDirection = null;
        if (direction === SortDirection.ascending) {
            newDirection = SortDirection.descending;
        } else {
            newDirection = SortDirection.ascending;
        }
        this.setState({
            sortDirection: newDirection
        });
    }

    onFilterInput(newFilter: string) {
        this.setState({
            filter: newFilter
        });
    }

    queryBadges(badge: Badge) {
        if (!badge) {
            return false;
        } else if (!this.state.filter) {
            return true;
        } else if (this.isMatch(badge, this.state.filter)) {
            return true;
        } else if (badge.isGroup) {
            const groupBadges = badge.badges;
            return groupBadges.some(badge => this.isMatch(badge, this.state.filter));
        }
        return false;
    }

    isMatch(badge: Badge, filter: string) {
        const filterString = this.escapeRegExp(filter);
        const regexFilter = new RegExp(filterString, 'i');
        return regexFilter.test(badge.name) ||
                regexFilter.test(badge.title) ||
                regexFilter.test(badge.comment) ||
                regexFilter.test(badge.categoryTags.join()) ||
                regexFilter.test(badge.createdAt.getFullYear().toString());
    }

    escapeRegExp(string: string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    sortBadges(a: Badge, b: Badge) {
        if (this.state.sortDirection === SortDirection.descending) {
            return b.id - a.id;
        } else {
            return a.id - b.id;
        }
    }

    processBadges(badge: Badge, index: number, badges: Badge[]) {
        const { sortDirection } = this.state;
        const key = badge.id;
        
        const lastBadge = badges[index - 1];
        const lastDate = lastBadge && lastBadge.createdAt;

        const props = {
            key,
            badge,
            sortDirection,
            lastDate
        };
        return (
            <BadgeRow {...props} />
        );
    }

    maybeRenderList() {
        if (!this.state.isLoading) {
            const isDescending = this.state.sortDirection === SortDirection.descending;
            const directionIcon = `fa fa-caret-${isDescending ? 'down' : 'up'}`;
            const directionWord = isDescending ? 'Descending' : 'Ascending';
            const badges = this.state.badges.filter(this.queryBadges)
                                            .sort(this.sortBadges)
                                            .map(this.processBadges);

            return (
                 <div>
                    <div className="sortContainer">
                        By Creation Date:
                        <div className="direction" onClick={this.toggleDirection}>
                            <i className={directionIcon} />
                            {directionWord}
                        </div>
                    </div>
                    <div className="badgeList">
                        {badges}
                    </div>
                </div>
            );
        }
        return (
            <div className="loading">
                <i className="fa fa-spinner fa-spin fa-2x" />
            </div>
        );
    }

    render() {
        return (
            <div>
                <Navbar filterText={this.state.filter} onChange={this.onFilterInput} />
                {this.maybeRenderList()}
            </div>
        );
    }
}