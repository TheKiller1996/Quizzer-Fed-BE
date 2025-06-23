const app = require('express');
const { handleUserLogin } = require('../controller/loginController');
const loginRouter = app.Router();


loginRouter.get('/authenticate',handleUserLogin)

module.exports = loginRouter;