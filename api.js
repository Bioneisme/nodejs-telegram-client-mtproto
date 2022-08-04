const path = require('path');
const MTProto = require('@mtproto/core');
require('dotenv').config();

class API {
    constructor() {
        this.mtproto = new MTProto({
            api_id: process.env.api_id,
            api_hash: process.env.api_hash,

            storageOptions: {
                path: path.resolve(__dirname, './data/1.json'),
            }
        });
    }

    async call(method, params, options = {}) {
        try {
            return await this.mtproto.call(method, params, options);
        } catch (error) {
            console.log(`${method} error:`, error);

            const {error_code, error_message} = error;

            if (error_code === 303) {
                const [type, dcIdAsString] = error_message.split('_MIGRATE_');

                const dcId = Number(dcIdAsString);

                if (type === 'PHONE') {
                    await this.mtproto.setDefaultDc(dcId);
                } else {
                    Object.assign(options, {dcId});
                }
                return this.call(method, params, options);
            }
            return Promise.reject(error);
        }
    }
}

module.exports = new API();