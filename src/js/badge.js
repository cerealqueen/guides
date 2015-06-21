function Badge (options) {
    if (!options && !options.name && !options.URL)
        throw new Error('invalid badge');
    this.id = options.id;
    this.name = options.name;
    this.url = options.URL;
    this.comment = options.comment;
    this.titleTag = options.title_tag;
    this.link = options.link;
    if (options.updated_at)
        this.updatedAt = new Date(options.updated_at.replace(/\s/, 'T'));
    if (options.created_at)
        this.createdAt = new Date(options.created_at.replace(/\s/, 'T'));
    this.categoryTags = options.category_tags;
    this.isGroup = false;
}

module.exports = Badge;