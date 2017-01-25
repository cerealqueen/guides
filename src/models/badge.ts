export interface Badge {
    name: string;
    url: string;
    id?: string;
    comment?: string;
    title?: string;
    link?: string;
    updatedAt?: Date;
    createdAt?: Date;
    categoryTags?: string[];
    isGroup?: boolean;
}