const info = (namespace: string, message: string, object?: any): void => {
    if (object)
        return console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);

    return console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
};

const warn = (namespace: string, message: string, object?: any): void => {
    if (object)
        return console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);

    return console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
};

const error = (namespace: string, message: string, object?: any): void => {
    if (object)
        return console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);

    return console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
};

const debug = (namespace: string, message: string, object?: any): void => {
    if (object)
        return console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);

    return console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
};

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

export default {
    info,
    warn,
    error,
    debug
};