const redis = require('redis');
const client = redis.createClient({
  url: 'redis://localhost:6379' // or use REDIS_URL for cloud services
});

client.connect().then(() => {
  console.log('Connected to Redis');
}).catch(console.error);

module.exports = client;