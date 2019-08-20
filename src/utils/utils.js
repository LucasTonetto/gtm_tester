const nodeListMap = (nodeList, fn) => {
    Array.prototype.map.call(nodeList, fn);
};

const getNextOption = (options) => options.reverse()[0];

module.exports = {
    "nodeListMap": nodeListMap,
    "getNextOption": getNextOption
};