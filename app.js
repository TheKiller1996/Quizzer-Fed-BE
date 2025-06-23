const express = require('express');
const { default: helmet } = require('helmet');
const cors = require('cors');
const cookie = require('cookie-parser');
const appRouter = require('./api/router/router.js');
require('./api/common/redis.js');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    withCredentials: true
}));


app.use(helmet());
app.use(cookie());
app.use(express.json());

app.use('/api/v1/',appRouter)


module.exports = app