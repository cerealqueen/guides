import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Navbar } from './Navbar';
import { BadgeRow } from './BadgeRow';
import { Badge } from '../models';

export class Guide extends React.Component<any, undefined> {
    constructor(props: GuideProps) {
        super(props);
    }
    
    async componentDidMount() {
        if (this.props.badges.length === 0 && this.props.filter.length === '') {
            await loadBadges();
        }
    }

    async loadBadges() {
        return null;
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

    queryBadges(badge: Badge) {
        if (!this.props.filter) {
            return true;
        } else if (this.isMatch(badge, this.props.filter)) {
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

    sortBadges(a: Badge, b: Badge) {
        if (this.props.isDescending) {
            return b.id - a.id;
        }
        return a.id - b.id;
    }

    processBadges(badge: Badge, index: number, badges: Badge[]) {
        const key = badge.id;
        const { isDescending } = this.props;
        
        const lastBadge = badges[index - 1];
        const lastDate = lastBadge && lastBadge.createdAt;

        const props = {
            key,
            badge,
            isDescending,
            lastDate
        };
        return (
            <BadgeRow {...props} />
        );
    }

    maybeRenderList() {
        if (this.props.isDoneLoading) {
            const directionIcon = `fa fa-caret-${this.props.isDescending ? 'down' : 'up'}`;
            const directionWord = this.props.isDescending ? 'Descending' : 'Ascending';
            const badges = this.props.badges.filter(this.queryBadges)
                                            .sort(this.sortBadges)
                                            .map(this.processBadges);

            return (
                 <div>
                    <div className="sortContainer">
                        By Creation Date:
                        <div className="direction" onClick={() => this.props.actions.setSortOrder(!this.props.isDescending)}>
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
        const props = {
            app: this.props
        };
        return (
            <div>
                <Navbar {...props} />
                {this.maybeRenderList()}
            </div>
        );
    }
}