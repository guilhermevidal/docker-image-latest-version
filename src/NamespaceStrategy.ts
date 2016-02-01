export abstract class NamespaceStrategy {
    constructor(protected namespace: string) { }
    abstract tagWithoutNamespace(tag: string): string;
    abstract appendNamespace(tag: string): string;
}