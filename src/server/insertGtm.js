const fs = require('fs');

const processTag = (tag) => {
    return tag.replace("<script>", "<script id='gtm'>");
};

const clearPage = (content) => {
    return content.replace(/<script id='gtm'>.+?<\/script>/i,"");
};

const insertTag = (tag, content) => {
    const tagClean = processTag(tag);
    const contentClean = clearPage(content);
    return contentClean.replace("<head>", "<head>"+tagClean);
}

const editFiles = (siteName, tag, file) => {
    fs.readFile(`./src/templates/${siteName}/${file}`, 'utf-8', (error, data) => {
        if (error) throw error;
        fs.writeFile(`./src/templates/${siteName}/${file}`, insertTag(tag, data), (error) => {
            if (error) throw error;
        });
    });
};

const insertGtmIn = (site, tag) => {
    const siteName = site.toLowerCase();
    fs.readdir(`./src/templates/${siteName}`, (error, files) => {
        if (error) throw error;
        const htmlFiles = files.filter((file) => file.match(/.*\.html/));
        htmlFiles.map((file) => {
            editFiles(siteName, tag, file);
        });
    });
};

module.exports = insertGtmIn;