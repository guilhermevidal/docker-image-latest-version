import { VersioningStrategy } from './VersioningStrategy';
export declare class SemverVersioningStrategy extends VersioningStrategy {
    constructor(range: string);
    compare(left: string, right: string): number;
    isValid(version: string): boolean;
}
