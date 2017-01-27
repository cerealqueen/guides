import * as React from 'react';
import * as ReactDOM from 'react-dom';

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
            <div className="badgeImgContainer">
                {imgContainer}
            </div>
        )
    }

    createImage(badge: Badge) {
        const image = (
                <img className="badgeImg" src={badge.url} alt={badge.title} />
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
                <div className="block">
                    <h3>{badge.title}</h3>
                    <ul className="badgeGroup">
                        {individualInfos}
                    </ul>
                </div>
            );
        }
        return (
            <div className="block">
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
            <div className="tag">
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
        const dividerClasses = `divider${isNewYear && ' newYear'}`;
        const newYear = (isNewYear && isDescending ? lastYear : thisYear);
        return (
            <div>
                <div className="dividerClasses">
                    {newYear}
                </div>
                <div className="badgeContainer">
                    <div className="badgeItem">
                        {this.maybeRenderImage(badge)}
                        {this.maybeRenderInfo(badge)}
                        {this.maybeRenderTags(badge.categoryTags)}
                    </div>
                </div>
            </div>
        )
    }
}