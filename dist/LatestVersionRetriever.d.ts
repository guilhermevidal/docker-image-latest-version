import { TagsProvider } from './TagsProvider';
import { VersioningStrategy } from './VersioningStrategy';
export declare class LatestVersionRetriever {
    private _tagsProvider;
    initWithTagsProvider(provider: TagsProvider): void;
    initWithOptions(options: {
        name: string;
        username?: string;
        password?: string;
        insecure?: boolean;
    }): void;
    latestVersion(version?: string, versioningStrategy?: VersioningStrategy): Promise<{}>;
}
