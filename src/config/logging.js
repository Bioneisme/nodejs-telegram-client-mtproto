"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const info = (namespace, message, object) => {
    if (object)
        return console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    return console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
};
const warn = (namespace, message, object) => {
    if (object)
        return console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
    return console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
};
const error = (namespace, message, object) => {
    if (object)
        return console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
    return console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
};
const debug = (namespace, message, object) => {
    if (object)
        return console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
    return console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
};
const getTimeStamp = () => {
    return new Date().toISOString();
};
exports.default = {
    info,
    warn,
    error,
    debug
};
