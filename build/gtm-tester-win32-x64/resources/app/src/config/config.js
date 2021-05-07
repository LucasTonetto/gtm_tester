const fs = require("fs");
const {editFileSync, getFileContentSync} = require("../utils/fileManipulate");

const editFileContent = (jsonFileContent, newPort) => {
    jsonFileContent.port = newPort;
    return jsonFileContent;
};

const editPort = (newPort, path) => {
    const jsonFileContent = JSON.parse(getFileContentSync(path));
    const newContent = JSON.stringify(editFileContent(jsonFileContent, newPort));
    editFileSync(path, newContent);
};

module.exports = {
    "editPort": editPort
};