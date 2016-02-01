import {NamespaceStrategy} from './NamespaceStrategy'

export class EndsWithDashedNamespaceStrategy extends NamespaceStrategy {
    private dashed: string;

    constructor(namespace: string) {
        super(namespace);
        this.dashed = '-' + namespace;
    }

    tagWithoutNamespace(tag: string): string {
        return !Boolean(this.namespace)
            ? tag
            : tag.substr(-this.dashed.length) == this.dashed
                ? tag.substr(0, tag.lastIndexOf(this.dashed))
                : void 0
            ;
    }

    appendNamespace(tag: string): string {
        return tag && this.namespace
            ? tag.concat(this.dashed)
            : tag;
    }
}