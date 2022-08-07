import http from "http";
import bodyParser from 'body-parser';
import express from 'express';
import logging from "./config/logging";
import settings from "./config/settings";

const NAMESPACE = "Server";
const app = express();

/** Logging */
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Error handling */
app.use((req, res) => {
    const error = new Error('Not found');

    res.status(404).send({
        message: error.message
    });
});

const httpServer = http.createServer(app);

httpServer.listen(settings.server.port, () => logging.info(NAMESPACE, `Server is running http://${settings.server.hostname}:${settings.server.port}`));