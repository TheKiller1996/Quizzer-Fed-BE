const app = require('express');
const googleRouter = app.Router();

const {getLoginStarted, handleGoogleCallback} = require('../controller/googleController')

googleRouter.get('/login',getLoginStarted);

googleRouter.get('/authenticated',handleGoogleCallback)

module.exports = googleRouter;