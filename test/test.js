///<reference path="../typings/main.d.ts" />
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var index_1 = require('../dist/index');
chai.should();
chai.use(chaiAsPromised);
describe('LatestVersionRetriever', function () {
    describe('latestVersion', function () {
        it('should return highest version', function () {
            return Promise.resolve(true)
                .then(function () { return assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '*', '2.0.0'); })
                .then(function () { return assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '~1', '1.0.1'); })
                .then(function () { return assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '~1.0.0', '1.0.1'); });
        });
        it('should return undefined when no compatible versions found', function () {
            return Promise.resolve(true)
                .then(function () { return assertHighestVersion([], '*', void 0); })
                .then(function () { return assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '~3', void 0); });
        });
        function assertHighestVersion(tags, pattern, expected) {
            return createLatestVersionRetriever(tags).latestVersion(pattern).should.eventually.be.equals(expected);
        }
        it('should connect to remote registry', function () {
            var lvr = new index_1.LatestVersionRetriever();
            lvr.initWithOptions({ name: 'busybox' });
            return lvr.latestVersion('~1.23').should.eventually.be.equals('1.23.2');
        });
    });
    function createLatestVersionRetriever(tags) {
        var lvr = new index_1.LatestVersionRetriever();
        lvr.initWithTagsProvider(new TagsProviderMock(null, tags));
        return lvr;
    }
});
var TagsProviderMock = (function () {
    function TagsProviderMock(err, tags) {
        this.err = err;
        this.tags = tags;
    }
    TagsProviderMock.prototype.listTags = function (callback) {
        callback(this.err, this.tags);
    };
    return TagsProviderMock;
})();
//# sourceMappingURL=test.js.map