const fs = require('fs');
const path = require('path');
const {getFileContentSync, editFileSync} = require('../utils/fileManipulate');

const insertIdInTag = (tag) => {
    return tag.replace(/((<script)>)|((<noscript)>)/ig, "$2$4 id='gtm'>");
};

const clearPage = (content) => {
    return content.replace(/(<script id='gtm'>.+?<\/script>)|(<noscript id='gtm'>.+?<\/noscript>)/i,"");
};

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

const editContentFile = (contentFile, tags) => {
    const tagsClean = tags.map(tag => insertIdInTag(tag));
    const contentFileClean = clearPage(contentFile);
    return addTags(contentFileClean, tagsClean);
};

const addTags = (content, tags) => {
    let newContent = content;
    tags.map(tag => {
        if(tag.match(/<script/)) {
            newContent = addTagHead(newContent, tag);
        } else if (tag.match(/<noscript/)) {
            newContent = addTagBody(newContent, tag);
        }
    });
    return newContent;
};

const addTagHead = (content, tag) => {
    return content.replace("<head>", "<head>"+tag);
};

const addTagBody = (content, tag) => {
    return content.replace(/<noscript.+?<\/noscript>/, ).replace(/((<body.*?)>)/, "$1"+tag);
};

const insertGtm = (site, tags) => {
    const siteDir = site.toLowerCase();
    const files = getSiteFiles(siteDir);
    const htmlFiles = filterHtmlFiles(files);
    htmlFiles.map(file => {
        const pathFile = path.join(__dirname, `\\..\\templates\\${siteDir}\\${file}`);
        const fileContent = getFileContentSync(pathFile);
        const newContent = editContentFile(fileContent, tags);
        editFileSync(pathFile, newContent);
    });
};

module.exports = insertGtm;