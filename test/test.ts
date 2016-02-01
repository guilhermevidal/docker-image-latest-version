///<reference path="../typings/main.d.ts" />
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {LatestVersionRetriever, TagsProvider} from '../dist/index';

chai.should();
chai.use(chaiAsPromised);

describe('LatestVersionRetriever', () => {
    describe('latestVersion', () => {
        it('should return highest version', () => {
            return Promise.resolve(true)
                .then(() => assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '*', '2.0.0'))
                .then(() => assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '~1', '1.0.1'))
                .then(() => assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '~1.0.0', '1.0.1'))
                ;
        });

        it('should return undefined when no compatible versions found', () => {
            return Promise.resolve(true)
                .then(() => assertHighestVersion([], '*', void 0))
                .then(() => assertHighestVersion(['1.0.0', '1.0.1', '2.0.0'], '~3', void 0))
                ;
        })

        function assertHighestVersion(tags: string[], pattern: string, expected: string) {
            return createLatestVersionRetriever(tags).latestVersion(pattern).should.eventually.be.equals(expected);
        }

        it('should connect to remote registry', () => {
            var lvr = new LatestVersionRetriever();
            lvr.initWithOptions({ name: 'busybox' });
            return lvr.latestVersion('~1.23').should.eventually.be.equals('1.23.2');
        })
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