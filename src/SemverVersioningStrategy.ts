import * as semver from 'semver';
import {VersioningStrategy} from './VersioningStrategy';

export class SemverVersioningStrategy extends VersioningStrategy {
    constructor(range: string) {
        super(range);
    }

    compare(left: string, right: string): number {
        if (left && !right) return 1;
        if (right && !left) return -1;
        if (!left && !right) return 0;
        if (semver.gt(left, right)) return 1;
        if (semver.gt(right, left)) return -1;

        return 0;
    }

    isValid(version: string): boolean {
        return semver.valid(version) && semver.satisfies(version, this.range);
    }
}
