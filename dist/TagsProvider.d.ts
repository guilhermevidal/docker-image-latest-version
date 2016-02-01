export interface TagsProvider {
    listTags(callback: (err: Error, tags: string[]) => void): void;
}
