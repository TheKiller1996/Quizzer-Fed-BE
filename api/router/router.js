const app = require('express');
const googleRouter = require('./googleRouter');
const userRouter = require('./appRouter');

const appRouter = app.Router()

appRouter.use('/google-fed', googleRouter);
appRouter.use('/user', userRouter);

module.exports = appRouter