export {LatestVersionRetriever} from './LatestVersionRetriever';
export {TagsProvider} from './TagsProvider';
export {VersionStrategy} from './VersionStrategy';
export {NamespaceStrategy} from  './NamespaceStrategy';


// var local = {
//     name: "https://192.168.99.100:5000/busybox",
//     username: 'dev',
//     password: 'dev',
//     insecure: true
// };

// var dockerio = {
//     name: "busybox"
// };

// var lvr = new LatestVersionRetriever();
// lvr.initWithOptions(dockerio);
// lvr.latestVersion('<=1.0', 'ubuntu')
//     .then(tags => console.log(JSON.stringify(tags)))
//     .catch(err => console.error(err));