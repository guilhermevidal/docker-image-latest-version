///<reference path="../typings/main" />
var drc = require('docker-registry-client');
var SemverVersioningStrategy_1 = require('./SemverVersioningStrategy');
var LatestVersionRetriever = (function () {
    function LatestVersionRetriever() {
    }
    LatestVersionRetriever.prototype.initWithTagsProvider = function (provider) {
        this._tagsProvider = provider;
    };
    LatestVersionRetriever.prototype.initWithOptions = function (options) {
        this._tagsProvider = new DockerRegistryClientTagsProvider(options);
    };
    LatestVersionRetriever.prototype.latestVersion = function (version, namespace, versioningStrategy) {
        var _this = this;
        if (version === void 0) { version = '*'; }
        if (namespace === void 0) { namespace = ''; }
        if (versioningStrategy === void 0) { versioningStrategy = new SemverVersioningStrategy_1.SemverVersioningStrategy(version); }
        return new Promise(function (resolve, reject) {
            _this._tagsProvider.listTags(function (err, tags) {
                if (err)
                    reject(err);
                else {
                    resolve(new TagsList(tags, versioningStrategy).maxSatisfying(version));
                }
            });
        });
    };
    return LatestVersionRetriever;
})();
exports.LatestVersionRetriever = LatestVersionRetriever;
var TagsList = (function () {
    function TagsList(tags, versioningStrategy) {
        this.tags = tags;
        this.versioningStrategy = versioningStrategy;
    }
    TagsList.prototype.maxSatisfying = function (version) {
        return this.maxVersionWithoutNamespace();
    };
    TagsList.prototype.maxVersionWithoutNamespace = function () {
        var _this = this;
        return this.tags
            .filter(function (t) { return _this.versioningStrategy.isValid(t); })
            .reduce(function (l, r) { return _this.versioningStrategy.compare(l, r) > 0 ? l : r; }, void 0);
    };
    return TagsList;
})();
var DockerRegistryClientTagsProvider = (function () {
    function DockerRegistryClientTagsProvider(options) {
        this._client = drc.createClientV2(options);
    }
    DockerRegistryClientTagsProvider.prototype.listTags = function (callback) {
        this._client.listTags(function (err, result) {
            callback(err, result.tags || []);
        });
    };
    return DockerRegistryClientTagsProvider;
})();
//# sourceMappingURL=LatestVersionRetriever.js.map