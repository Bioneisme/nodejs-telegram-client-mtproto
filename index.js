const auth = require('./methods/authMethods');
const messages = require('./methods/msgMethods');


(async () => {
    const user = await auth.getUser();

    if (user) {
        console.log("user")
    }

})();