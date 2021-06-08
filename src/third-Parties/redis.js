const redis = require('redis'); // ES6 +
const { promisify } = require('util');
const { exec } = require('child_process'); // to start the redis database in development
/*// for windows user import {execFile} from 'child_process';        
// for ES5 users
const redis = require('redis')*/
// if in development mode use Redis file attached
// start redis as a child process
if (process.env.NODE_ENV === 'development') {
    const puts = (error, stdout) => {
        console.log(error);
        console.log(stdout);
    };
    //exec('redis/src/redis-server redis/redis.conf', puts);
}
/* for window implementation 
execFile('redis/redis-server.exe',(error,stdout)=>{
if(error){
throw error
}
console.log(stdout)
})
*/
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
