import http from "http";
import bodyParser from 'body-parser';
import express from 'express';
import authRoute from "./routes/authRoute";
import msgRoute from "./routes/msgRoute";
import logging from "./config/logging";
import {SERVER} from "./config/settings";

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

app.set('view engine', 'ejs');
app.set('views','./src/views');

app.use(authRoute);
app.use(msgRoute);

/** Error handling */
app.use((req, res) => {
    const error = new Error('Not found');

    res.status(404).send({
        message: error.message
    });
});


const httpServer = http.createServer(app);

httpServer.listen(SERVER.port, () => logging.info(NAMESPACE, `Server is running http://${SERVER.hostname}:${SERVER.port}`));