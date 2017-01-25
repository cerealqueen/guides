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