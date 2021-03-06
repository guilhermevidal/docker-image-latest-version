export declare abstract class VersioningStrategy {
    protected range: string;
    constructor(range: string);
    abstract compare(left: string, right: string): number;
    abstract isValid(version: string): boolean;
}
