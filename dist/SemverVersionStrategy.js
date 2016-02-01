var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var semver = require('semver');
var VersioningStrategy_1 = require('./VersioningStrategy');
var SemverVersioningStrategy = (function (_super) {
    __extends(SemverVersioningStrategy, _super);
    function SemverVersioningStrategy(range) {
        _super.call(this, range);
    }
    SemverVersioningStrategy.prototype.compare = function (left, right) {
        if (left && !right)
            return 1;
        if (right && !left)
            return -1;
        if (!left && !right)
            return 0;
        if (semver.gt(left, right))
            return 1;
        if (semver.gt(right, left))
            return -1;
        return 0;
    };
    SemverVersioningStrategy.prototype.isValid = function (version) {
        return semver.valid(version) && semver.satisfies(version, this.range);
    };
    return SemverVersioningStrategy;
})(VersioningStrategy_1.VersioningStrategy);
exports.SemverVersioningStrategy = SemverVersioningStrategy;
//# sourceMappingURL=SemverVersionStrategy.js.map