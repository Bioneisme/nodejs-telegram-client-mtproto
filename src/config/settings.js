"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.REDIS = exports.SERVER = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = +(process.env.REDIS_PORT || 13098);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const HASH = process.env.HASH;
exports.SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
exports.REDIS = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    hash: HASH
};
exports.config = {
    server: exports.SERVER,
    redis: exports.REDIS
};
