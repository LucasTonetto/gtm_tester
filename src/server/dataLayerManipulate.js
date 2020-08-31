const {getFileContentSync} = require('../utils/fileManipulate');
const path = require('path');

const jQueryTag = '<script type="text/javascript" src="js/jquery.min.js"></script>\n';
const dataLayerTag = '<script type="text/javascript" src="js/dataLayer.js"></script>\n';

const insertDefaultDataLayer = (fileContent) => {
    return fileContent
        .replace(jQueryTag, '')
        .replace(dataLayerTag, '')
        .replace('</head>', jQueryTag + dataLayerTag + '</head>');
}

const removeDefaultDataLayer = (fileContent) => {
    return fileContent.replace(dataLayerTag, '');
}

const dataLayerEnabled = () => {
    const fileContent = getFileContentSync(path.join(__dirname, '\\..\\templates\\ecommerce\\index.html'));
    return fileContent.match(dataLayerTag);
}

module.exports = {insertDefaultDataLayer, removeDefaultDataLayer, dataLayerEnabled};