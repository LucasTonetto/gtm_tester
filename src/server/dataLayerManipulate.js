const htmlManipulate = require('./htmlManipulate');

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

module.exports = {insertDefaultDataLayer, removeDefaultDataLayer};

htmlManipulate('ecommerce', removeDefaultDataLayer);