"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const msgRoute_1 = __importDefault(require("./routes/msgRoute"));
const logging_1 = __importDefault(require("./config/logging"));
const settings_1 = __importDefault(require("./config/settings"));
const NAMESPACE = "Server";
const app = (0, express_1.default)();
/** Logging */
app.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.set('view engine', 'ejs');
app.use(authRoute_1.default);
app.use(msgRoute_1.default);
/** Error handling */
app.use((req, res) => {
    const error = new Error('Not found');
    res.status(404).send({
        message: error.message
    });
});
const httpServer = http_1.default.createServer(app);
httpServer.listen(settings_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server is running http://${settings_1.default.server.hostname}:${settings_1.default.server.port}`));
