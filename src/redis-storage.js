"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = exports.RedisStorage = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisStorage {
    constructor(hash, redisOptions, redisInstance) {
        this.hash = hash;
        this.redis = redisInstance || new ioredis_1.default(redisOptions);
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const val = yield this.redis.hget(this.hash, key);
            // @ts-ignore
            return JSON.parse(val);
        });
    }
    ;
    set(key, val) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redis.hset(this.hash, key, JSON.stringify(val));
        });
    }
    has(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.redis.hexists(this.hash, key);
            return !!exists;
        });
    }
    remove(...keys) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redis.hdel(this.hash, ...keys);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redis.del(this.hash);
        });
    }
}
exports.RedisStorage = RedisStorage;
exports.Storage = RedisStorage;
exports.default = RedisStorage;
