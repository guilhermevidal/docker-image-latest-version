var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NamespaceStrategy_1 = require('./NamespaceStrategy');
var EndsWithDashedNamespaceStrategy = (function (_super) {
    __extends(EndsWithDashedNamespaceStrategy, _super);
    function EndsWithDashedNamespaceStrategy(namespace) {
        _super.call(this, namespace);
        this.dashed = '-' + namespace;
    }
    EndsWithDashedNamespaceStrategy.prototype.tagWithoutNamespace = function (tag) {
        return !Boolean(this.namespace)
            ? tag
            : tag.substr(-this.dashed.length) == this.dashed
                ? tag.substr(0, tag.lastIndexOf(this.dashed))
                : void 0;
    };
    EndsWithDashedNamespaceStrategy.prototype.appendNamespace = function (tag) {
        return tag && this.namespace
            ? tag.concat(this.dashed)
            : tag;
    };
    return EndsWithDashedNamespaceStrategy;
})(NamespaceStrategy_1.NamespaceStrategy);
exports.EndsWithDashedNamespaceStrategy = EndsWithDashedNamespaceStrategy;
//# sourceMappingURL=EndsWithDashedNamespaceStrategy.js.map