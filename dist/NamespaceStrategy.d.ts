export declare abstract class NamespaceStrategy {
    protected namespace: string;
    constructor(namespace: string);
    abstract tagWithoutNamespace(tag: string): string;
    abstract appendNamespace(tag: string): string;
}
