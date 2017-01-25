import * as React from 'react';

import { Badge } from '../models';

interface BadgeRowProps {
    badge: Badge,
    lastDate: Date,
    isDescending: boolean
}

export class BadgeRow extends React.Component<BadgeRowProps, undefined> {
    maybeRenderImage(badge: Badge) {
        let imgContainer;
        if (badge.isGroup) {
            imgContainer = badge.badges.map(this.createImage);
        } else {
            imgContainer = this.createImage(badge);
        }
        return (
            <div style={styles.badgeImgContainer}>
                {imgContainer}
            </div>
        )
    }

    createImage(badge: Badge) {
        const image = (
                <img style={styles.badgeImg} src={badge.url} alt={badge.titleTag} />
                );
        if (badge.link) {
            return (
                <a key={badge.url} href={badge.link}>
                    {image}
                </a>
            );
        }
        return image;
    }

    maybeRenderInfo(badge: Badge) {
        if (badge.isGroup) {
            const individualInfos = badge.badges.map(this.mapBadgeGroup);
            return (
                <div style={styles.block}>
                    <h3>{badge.title}</h3>
                    <ul style={styles.badgeGroup}>
                        {individualInfos}
                    </ul>
                </div>
            );
        }
        return (
            <div style={styles.block}>
                <h3>{badge.name}</h3>
                <p>{badge.comment}</p>
            </div>
        );
    }

    mapBadgeGroup(badge: Badge) {
        return (
            <li key={badge.id}>
                {badge.name}<br />
                {badge.comment}
            </li>
        );
    }

    maybeRenderTags(tags: string[]) {
        const tagStr = tags.length >= 1 ? tags.join(', ') : 'No tags';
        return (
            <div style={styles.tag}>
                Tags: {tagStr}
            </div>
        )
    }
    
    render() {
        const { badge, lastDate, isDescending } = this.props;
        let thisYear;
        if (badge.createdAt) {
            thisYear = badge.createdAt.getFullYear();
        }
        let lastYear;
        if (lastDate) {
            lastYear = lastDate.getFullYear();
        }
        const isNewYear = lastYear && thisYear !== lastYear;
        const dividerClasses: any[] = [styles.divider];
        let newYear;
        if (isNewYear) {
            dividerClasses.push(styles.newYear);
            newYear = isDescending ? lastYear : thisYear;
        }
        return (
            <div>
                <div style={dividerClasses}>
                    {newYear}
                </div>
                <div style={styles.badgeContainer}>
                    <div style={styles.badgeItem}>
                        {this.maybeRenderImage(badge)}
                        {this.maybeRenderInfo(badge)}
                        {this.maybeRenderTags(badge.categoryTags)}
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    badgeImgContainer: {
        float: 'left',
        display: 'inline-block',
        padding: '0px 10px',
        height: '100%'
    },
    badgeImg: {
        minWidth: 30,
        minHeight: 30
    },
    block: {
        margin: 10,
        display: 'inline-block'
    },
    badgeGroup: {
        fontStyle: 'italic'
    },
    tag: {
        textAlign: 'right',
        width: '95%',
        display: 'inline-block',
        margin: 10,
        fontStyle: 'italic',
        fontSize: 11
    },
    divider: {
        width: '86%',
        color: '#b3b3b3',
        display: 'block',
        borderTopWidth: 0,
        borderTopStyle: 'solid',
        margin: '0px 7% 0px 7%',
        opacity: 0.8
    },
    newYear: {
        display: 'inline-block',
        paddingTop: 10,
        borderTopWidth: 2
    },
    badgeContainer: {
        width: '80%',
        margin: '1em auto',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#113662',
        WebkitBoxShadow: '0 0 10px #113662',
        MozBoxShadow: '0 0 10px #113662',
        boxShadow: '0 0 10px #113662',
        backgroundColor: '#001228'
    },
    badgeItem: {
        margin: '5px 0px',
        position: 'relative'
    }
};