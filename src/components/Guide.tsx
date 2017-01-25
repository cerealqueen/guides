import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Navbar } from './Navbar';
import { BadgeRow } from './BadgeRow';
import { Badge } from '../models';

interface GuideProps {
    url: string
}

interface GuideState {
    badges: Badge[],
    filterText: string;
    isDoneLoading: boolean;
    isDescending: boolean;
}

export class Guide extends React.Component<GuideProps, GuideState> {
    constructor(props: GuideProps) {
        super(props);
        this.state = {
            badges: [],
            filterText: '',
            isDoneLoading: false,
            isDescending: true
        };
    }
    
    componentDidMount() {

    }

    loadBadges() {

    }

    handleUserInput(filterText: string) {
        this.setState({ filterText });
    }

    handleSortDirectionToggle() {
        const { badges, isDescending } = this.state;
        badges.sort((a, b) => {
            if (isDescending) {
                return b.id - a.id;
            }
            return a.id - b.id;
        });
        this.setState({ isDescending });
    }

    isMatch(badge: Badge) {
        const filterString = this.escapeRegExp(this.state.filterText);
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

    queryBadges(badge: Badge) {
        if (!this.state.filterText) {
            return true;
        } else if (this.isMatch(badge)) {
            return true;
        } else if (badge.isGroup) {
            for (let i = 0; i < badge.badges.length; i++) {
                const b = badge.badges[i];
                if (this.isMatch(b)) {
                    return true;
                }
            }
        }
    }

    processBadges(badge: Badge, index: number, badges: Badge[]) {
        const lastBadge = badges[index - 1];
        let lastDate;
        if (lastBadge) {
            lastDate = lastBadge.createdAt;
        }
        const props = {
            key: badge.id,
            badge: badge,
            isDescending: this.state.isDescending,
            lastDate
        };
        return (
            <BadgeRow {...props} />
        );
    }

    maybeRenderList() {
        if (this.state.isDoneLoading) {
            const directionIcon = `fa fa-caret-${this.state.isDescending ? 'down' : 'up'}`;
            const directionWord = this.state.isDescending ? 'Descending' : 'Ascending';
            const badges = this.state.badges.filter(this.queryBadges).map(this.processBadges);

            return (
                 <div>
                    <div className="sortContainer">
                        By Creation Date:
                        <div className="direction" onClick={this.handleSortDirectionToggle.bind(this)}>
                            <i className={directionIcon} /> {directionWord}
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
        const props = {
            filterText: this.state.filterText,
            onUserType: this.handleUserInput
        };
        return (
            <div>
                <Navbar {...props} />
                {this.maybeRenderList()}
            </div>
        );
    }
}