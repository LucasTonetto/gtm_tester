const fs = require("fs");

const getFileContentSync = (pathFile) => {
    const fileContent = fs.readFileSync(pathFile, 'utf-8', (error, data) => {
        if (error) throw error;
        return data;
    });
    return fileContent;
};

const editFileSync = (pathFile, newContent) => {
    fs.writeFileSync(pathFile, newContent, (error) => {
        if (error) throw error;
    });
};

module.exports = {
    "getFileContentSync": getFileContentSync,
    "editFileSync": editFileSync
};