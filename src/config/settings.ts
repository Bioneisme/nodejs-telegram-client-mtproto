import dotenv from "dotenv";

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = +(process.env.REDIS_PORT || 13098);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const HASH = process.env.HASH

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const REDIS = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    hash: HASH
};

const config = {
    server: SERVER,
    redis: REDIS
};

export default config;