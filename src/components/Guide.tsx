import * as React from 'react';

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
                    <div style={styles.sortContainer}>
                        By Creation Date:
                        <div style={styles.direction} onClick={this.handleSortDirectionToggle}>
                            <i className={directionIcon} /> {directionWord}
                        </div>
                    </div>
                    <div style={styles.badgeList}>
                        {badges}
                    </div>
                </div>
            );
        }
        return (
            <div style={styles.loading}>
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

const styles = {
    sortContainer: {
        margin: '1em auto',
        width: '80%',
        color: '#a4eda9',
        //fontWeight: 'bold',
        textAlign: 'right'
    },
    direction: {
        cursor: 'pointer',
        display: 'inline-block',
        paddingLeft: 10
    },
    badgeList: {

    },
    loading: {
        margin: '1em auto',
        textAlign: 'center'
    }
};