// @ts-ignore
import MTProto from "@mtproto/core";
import {Storage} from "./redis-storage";
import {REDIS} from "./config/settings";

require('dotenv').config();

const redisOptions = {
    host: REDIS.host,
    port: REDIS.port,
    password: REDIS.password
};

const storage = new Storage(REDIS.hash, redisOptions);

class API {
    mtProto: any;
    constructor() {
        // @ts-ignore
        this.mtProto = new MTProto({
            api_id: process.env.api_id,
            api_hash: process.env.api_hash,

            storageOptions: {
                instance: storage
            }
        });
    }

    async call(method: any, params: any, options = {}): Promise<any> {
        try {
            return await this.mtProto.call(method, params, options);
        } catch (error) {
            console.log(`${method} error:`, error);

            // @ts-ignore
            const {error_code, error_message} = error;

            if (error_code === 303) {
                const [type, dcIdAsString] = error_message.split('_MIGRATE_');

                const dcId = Number(dcIdAsString);

                if (type === 'PHONE') {
                    await this.mtProto.setDefaultDc(dcId);
                } else {
                    Object.assign(options, {dcId});
                }
                return this.call(method, params, options);
            }
            return Promise.reject(error);
        }
    }
}

export default new API();