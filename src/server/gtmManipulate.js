const path = require('path');

const insertIdInTag = (tag) => {
    return tag.replace(/((<script)>)|((<noscript)>)/ig, "$2$4 id='gtm'>");
};

const clearPage = (content) => {
    return content.replace(/(<script id='gtm'>.+?<\/script>)|(<noscript id='gtm'>.+?<\/noscript>)/i,"");
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

const insertGtm = (fileContent, tags) => {
    const tagsClean = tags.map(tag => insertIdInTag(tag));
    const fileContentClean = clearPage(fileContent);
    return addTags(fileContentClean, tagsClean);
};

const removeGtmById= (fileContent, gtmId) => {
    const scriptRegex = new RegExp(`<script id='gtm'>(.+?[\r\n]+){0,5}.+?'${gtmId}'.+?<\/script>`, 'gi');
    const noscriptRegex = new RegExp(`<noscript id='gtm'>.+?${gtmId}"([\r\n]+)?.+?<\/noscript>`, 'gi');
    const newContent = fileContent.replace(scriptRegex, "").replace(noscriptRegex, "");
    return newContent.replace(/<\!-- (End )?Google Tag Manager (\(noscript\) )?-->([\r\n]+)?/g, "");
}

module.exports = {insertGtm, removeGtmById};