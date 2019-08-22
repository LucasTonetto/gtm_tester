const fs = require('fs');

const processTag = (tag) => {
    return tag.replace("<script>", "<script id='gtm'>");
};

const clearPage = (content) => {
    return content.replace(/<script id='gtm'>.+?<\/script>/i,"");
};

const getSiteFiles = (siteDir) => {
    const files = fs.readdirSync(`./src/templates/${siteDir}`, (error, files) => {
        if (error) throw error;
        return files;
    });
    return files;
};

const filterHtmlFiles = (files) => {
    return files.filter(file => file.match(/.*\.html/));
};

const getFileContent = (pathFile) => {
    const fileContent = fs.readFileSync(pathFile, 'utf-8', (error, data) => {
        if (error) throw error;
        return data;
    });
    return fileContent;
};

const editContentFile = (contentFile, tag) => {
    const tagClean = processTag(tag);
    const contentFileClean = clearPage(contentFile);
    return contentFileClean.replace("<head>", "<head>"+tagClean);
};

const editFile = (pathFile, newContent) => {
    fs.writeFileSync(pathFile, newContent, (error) => {
        if (error) throw error;
    });
};

const insertGtmIn = (site, tag) => {
    const siteDir = site.toLowerCase();
    const files = getSiteFiles(siteDir);
    const htmlFiles = filterHtmlFiles(files);
    htmlFiles.map(file => {
        const pathFile = `./src/templates/${siteDir}/${file}`;
        const fileContent = getFileContent(pathFile);
        const newContent = editContentFile(fileContent, tag);
        editFile(pathFile, newContent);
    });
};

module.exports = insertGtmIn;