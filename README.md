# docker-image-latest-version
Checks the latest version of a docker image.

``` js
var LatestVersionRetriever = require('docker-image-latest-version').LatestVersionRetriever

var lvr = new LatestVersionRetriever();
lvr.initWithOptions({ name: 'busybox' });

lvr.latestVersion('~1.23')
    .then(function (data) { console.log(data); })
    .catch(function (error) { console.error(error); });
```

## License

MIT / Apache2