///<reference path="../typings/main.d.ts" />
import * as drc from 'docker-registry-client';
import * as semver from 'semver';

import {TagsProvider} from './TagsProvider';
import {VersioningStrategy} from './VersioningStrategy';
import {SemverVersioningStrategy} from './SemverVersioningStrategy';

export class LatestVersionRetriever {
    private _tagsProvider: TagsProvider;

    initWithTagsProvider(provider: TagsProvider) {
        this._tagsProvider = provider;
    }

    initWithOptions(options: {
        name: string;
        username?: string;
        password?: string;
        insecure?: boolean;
    }) {
        this._tagsProvider = new DockerRegistryClientTagsProvider(options);
    }

    latestVersion(
        version: string = '*',
        namespace: string = '',
        versioningStrategy: VersioningStrategy = new SemverVersioningStrategy(version)
    ) {
        return new Promise((resolve, reject) => {
            this._tagsProvider.listTags((err, tags) => {
                if (err) reject(err)
                else {
                    resolve(new TagsList(tags, versioningStrategy).maxSatisfying(version));
                }
            })
        });
    }
}

class TagsList {
    private dashed: string;

    constructor(
        private tags: string[],
        private versioningStrategy: VersioningStrategy) {
    }

    maxSatisfying(version: string) {
        return this.maxVersionWithoutNamespace();
    }

    private maxVersionWithoutNamespace() {
        return this.tags
            .filter(t => this.versioningStrategy.isValid(t))
            .reduce((l, r) => this.versioningStrategy.compare(l, r) > 0 ? l : r, void 0);
    }
}

class DockerRegistryClientTagsProvider implements TagsProvider {
    private _client: drc.Client;

    constructor(options: {
        name: string;
        username?: string;
        password?: string;
        insecure?: boolean;
    }) {
        this._client = drc.createClientV2(options);
    }

    listTags(callback: (err: Error, tags: string[]) => void): void {
        this._client.listTags((err, result) => {
            callback(err, result.tags || []);
        });
    }
}
