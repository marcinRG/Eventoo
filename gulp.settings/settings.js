var devFolder = './src/';
var assetsFolder = devFolder + 'assets/';
var tsFolder = devFolder + 'app/';
var sassFolder = devFolder + 'scss/';
var cssFolder = assetsFolder + 'css/';
var remoteTests = './test/remote-tests/';
var testMapsFolder = './test/maps-test/';
var testMiscellaneousFolder = './test/playground/';
var appFolder = devFolder + 'app/';
var serverFolder = './server/';
var buildPath = './build/';

var paths = {
    client: './src/',
    index: devFolder + 'index.html',
    allTSs: [tsFolder + '**/*.ts'],
    app: [appFolder + '**/*.ts'],
    otherAppResources: [devFolder + 'index.html', devFolder + 'systemjs.config.js', '!' + assetsFolder + '**/*.*', devFolder + '**/*.html', devFolder + '**/*.css'],
    assets: assetsFolder + '**/*.*',
    tsFile: tsFolder + 'main.ts',
    scssStyles: [sassFolder + '**/*.scss', '!' + sassFolder + 'libs/' + '**/*.scss'],
    scssFile: sassFolder + 'style.scss',
    cssFile: cssFolder
};

var tests = {
    tsFile: remoteTests + 'remote.test.ts',
    tsFileMaps: testMapsFolder + 'maps.tests.ts',
    tsFileMisc: testMiscellaneousFolder + 'misc.tests.ts',
    compiledJS: remoteTests + 'bundle.js',
    compiledMapsJS: testMapsFolder + 'bundle.js',
    compiledMiscJS: testMiscellaneousFolder + 'bundle.js'
};

var build = {
    appPath: buildPath + 'app',
    path: buildPath,
    buildAssets: buildPath + 'assets'
};

var server = {
    serverApp: serverFolder + 'server.js',
    serverFiles: [serverFolder + 'server.js', serverFolder + '**/*.js'],
    port: 4580
};

module.exports = {
    app: paths,
    server: server,
    build: build,
    tests: tests
};

