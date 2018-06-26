#!/usr/bin/env node

const fse = require('fs-extra');
const path = require('path');

const projectName = 'cashmere';
const libSrcDir = '../projects/cashmere';
const libOutDir = '../dist/cashmere';

console.log('resolved Lib: ' + resolvePath(libOutDir));

const assets = [
    [libSrcDir + '/src/lib/sass/', libOutDir + '/scss'],
    [libSrcDir + '/README.md', libOutDir + '/README.md'],
    ['../LICENSE', libOutDir + '/LICENSE'],
    ['../CashmereBanner.png', libOutDir + '/CashmereBanner.png']
];

Promise.all(copyAssets(resolveSrcDestPaths(assets)))
    .then(_ => fse.remove('dist/cashmere.tgz'))
    .then(_ => console.log('Finished copying assets'))
    .catch(e => console.log(e));

function resolveSrcDestPaths(relativeSrcDest) {
    return relativeSrcDest.map(paths => [resolvePath(paths[0]), resolvePath(paths[1])]);
}

function resolvePath(relativePath) {
    return path.resolve(path.join(__dirname, relativePath));
}

function copyAssets(files) {
    return files.map(srcDest => {
        console.log(`Copying ${srcDest[0]} to ${projectName} dist`);
        return fse.copy(srcDest[0], srcDest[1]);
    });
}
