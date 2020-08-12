const fs = require('fs');
const path = require('path');
const {getFileContentSync, editFileSync} = require('../utils/fileManipulate');

const getSiteFiles = (siteDir) => {
    const files = fs.readdirSync(path.join(__dirname, `\\..\\templates\\${siteDir}`), (error, files) => {
        if (error) throw error;
        return files;
    });
    return files;
};

const filterHtmlFiles = (files) => {
    return files.filter(file => file.match(/.*\.html/));
};

const htmlManipulate = (site, callback, callbackArg) => {
    const siteDir = site.toLowerCase();
    const files = getSiteFiles(siteDir);
    const htmlFiles = filterHtmlFiles(files);
    htmlFiles.map(file => {
        const pathFile = path.join(__dirname, `\\..\\templates\\${siteDir}\\${file}`);
        const fileContent = getFileContentSync(pathFile);
        const newContent = callback(fileContent, callbackArg);
        editFileSync(pathFile, newContent);
    });
};

module.exports = htmlManipulate;