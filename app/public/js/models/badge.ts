export interface Badge {
    name: string;
    url: string;
    id?: number;
    comment?: string;
    title?: string;
    link?: string;
    updatedAt?: Date;
    createdAt?: Date;
    categoryTags?: string[];
    isGroup?: boolean;
    badges?: Badge[]
}

export class Badge {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.url = data.URL;
        this.comment = data.comment;
        this.title = data.title_tag;
        this.link = data.link;
        this.createdAt = new Date(data.created_at.replace(/\s/, 'T'));
        this.updatedAt = new Date(data.updated_at.replace(/\s/, 'T'));
        this.categoryTags = data.category_tags;
        this.isGroup = !!data.group_id;
        this.badges = [];
    }
}