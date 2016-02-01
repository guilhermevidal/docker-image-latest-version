///<reference path="../typings/main.d.ts" />
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {LatestVersionRetriever, TagsProvider} from '../dist/index';

chai.should();
chai.use(chaiAsPromised);

describe('LatestVersionRetriever', function() {
    describe('latestVersion', function() {
        it('should return highest version', function() {
            return Promise.resolve(true)
                .then(() => assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '*', '2.0.0'))
                .then(() => assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '^1', '1.0.1'))
                .then(() => assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '^1.0.0', '1.0.1'))
                ;
        });

        function assertHighestVersion(tags: string[], pattern: string, expected: string) {
            return Promise.resolve(createLatestVersionRetriever(tags).latestVersion(pattern).should.eventually.be.equals(expected));
        }
    });

    function createLatestVersionRetriever(tags: string[]) {
        var lvr = new LatestVersionRetriever();
        lvr.initWithTagsProvider(new TagsProviderMock(null, tags));
        return lvr;
    }
});

class TagsProviderMock implements TagsProvider {
    constructor(private err: Error, private tags: string[]) { }

    listTags(callback: (err: Error, tags: string[]) => void): void {
        callback(this.err, this.tags);
    }
}