import { NamespaceStrategy } from './NamespaceStrategy';
export declare class EndsWithDashedNamespaceStrategy extends NamespaceStrategy {
    private dashed;
    constructor(namespace: string);
    tagWithoutNamespace(tag: string): string;
    appendNamespace(tag: string): string;
}
