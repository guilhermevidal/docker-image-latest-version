export abstract class VersioningStrategy {
    constructor(protected range: string) { }

    abstract compare(left: string, right: string): number;
    abstract isValid(version: string): boolean;
}