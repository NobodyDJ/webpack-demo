const fs = require('fs');
const path = require('path');

// process.cwd() 返回node.js进程的当前工作目录。
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
module.exports = {
    resolveApp,
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appSrc: resolveApp('src'),
    appDist: resolveApp('dist'),
    appTsConfig: resolveApp('tsconfig.json'),
}
