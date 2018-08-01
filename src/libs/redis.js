const redis = require('redis')
const config = require('../config')
// The client stashes the password and will reauthenticate on every connect.
const client = redis.createClient(config.redis_url)

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on("connect", function () {
    console.log('redis connected', config.redis_url);
});

module.exports = client