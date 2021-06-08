
/**
 * redis npm module to connect to redis-server
 * @module
 */
const redis = require('redis'); // ES6 +

/**
 * prmosify npm module to make callback functions async await
 * @module
 */
const { promisify } = require('util');

if (process.env.NODE_ENV === 'development') {
    const puts = (error, stdout) => {
        console.log(error);
        console.log(stdout);
    };
    //exec('redis/src/redis-server redis/redis.conf', puts);
}

const redisClient = redis.createClient(process.env.REDIS_URL);
// process.env.REDIS_URL is the redis url config variable name on heroku.
// if local use redis.createClient()
redisClient.on('connect', () => {
    if(process.env.NODE_ENV != 'TEST')
        console.log('Redis client connected');
});
redisClient.on('error', (error) => {
    if(process.env.NODE_ENV != 'TEST')
        console.log('Redis not connected', error);
});
module.exports.getAsync = promisify(redisClient.get).bind(redisClient);
module.exports.setAsync = promisify(redisClient.set).bind(redisClient);
module.exports.redisClient = redisClient