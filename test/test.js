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
                .then(function () { return assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '^1', '1.0.1'); })
                .then(function () { return assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '^1.0.0', '1.0.1'); });
        });
        function assertHighestVersion(tags, pattern, expected) {
            return Promise.resolve(createLatestVersionRetriever(tags).latestVersion(pattern).should.eventually.be.equals(expected));
        }
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