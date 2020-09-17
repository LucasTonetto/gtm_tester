const {getFileContentSync, copyFileSync, editFileSync} = require('../utils/fileManipulate');
const path = require('path');

const jQueryTag = '<script type="text/javascript" src="js/jquery.min.js"></script>\n';
const defaultDataLayerTag = '<script type="text/javascript" src="js/dataLayer.js"></script>\n';
const customDatalayerTag = '<script type="text/javascript" src="js/customDatalayer.js"></script>\n';

/**
 * Callback function for the html manipulation, that inserts the datalayer's tag into the file.
 * @param {String} fileContent The file data 
 * @param {*} type The type of the datalayer, if it's the default or de customized 
 */
const insertDatalayerTag = (fileContent, type) => {
    let newTag = (type == 'default')? defaultDataLayerTag : customDatalayerTag;
    return fileContent
        .replace(jQueryTag, '')
        .replace(defaultDataLayerTag, '')
        .replace(customDatalayerTag, '')
        .replace('</head>', jQueryTag + newTag + '</head>');
}

/**
 * Callback function for the html manipulation, that removes the only datalayer installed in the html files. 
 * @param {String} fileContent 
 */
const removeDatalayerTag = (fileContent) => {
    return fileContent
        .replace(defaultDataLayerTag, '')
        .replace(customDatalayerTag, '');
}

/**
 * Verify the status of the datalayer on the site.
 * @param {String} site 
 * @returns an array, in which the first item is the status of the default dayalayer and the second of the custom datalayer. For each, TRUE means that the datalayer is enabled.
 */
const dataLayerEnabled = (site) => {
    const fileContent = getFileContentSync(path.join(__dirname, `\\..\\templates\\${site}\\index.html`));
    return [fileContent.match(defaultDataLayerTag) ? true : false, fileContent.match(customDatalayerTag) ? true : false];
}

/**
 * Copy the new file to the custom datalayer's file that already exists in the app src.
 * @param {String} site 
 * @param {String} filePath The path of the new custom datalayer's file
 */
const insertCustomDatalayer = (site, filePath) => {
    let destPath = path.join(__dirname, `\\..\\templates\\${site}\\js\\customDatalayer.js`);
    copyFileSync(filePath, destPath);
}

/**
 * Clear the content of the custom datalayer's file of the app.
 * @param {String} site 
 */
const removeCustomDatalayer = (site) => {
    let filePath = path.join(__dirname, `\\..\\templates\\${site}\\js\\customDatalayer.js`);
    editFileSync(filePath, '');
}

/**
 * Verify if the custom datalayer's file is empty.
 * @param {String} site 
 * @returns TRUE if the file is empty or FALSE if the file has some content.
 */
const emptyCustomDatalayer = (site) => {
    let filePath = path.join(__dirname, `\\..\\templates\\${site}\\js\\customDatalayer.js`);
    return (getFileContentSync(filePath))? false : true;
}

module.exports = {
    insertDatalayerTag, 
    removeDatalayerTag, 
    dataLayerEnabled,
    insertCustomDatalayer,
    removeCustomDatalayer,
    emptyCustomDatalayer
};