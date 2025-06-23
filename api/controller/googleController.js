const { configDotenv } = require('dotenv');
const { env } = require('process');
const {startLogin, fetchToken} = require('../service/googleService');
const redisClient = require('../common/redis');

configDotenv();

const handleGoogleCallback = async (req, res)=>{
    try{
        const { code } = req.query;
        const acessTokenUrl = env.GOOGLE_ACCESS_TOKEN_URL;
        const {token, email} = await fetchToken(acessTokenUrl, code);

        redisClient.set(email, token)
        res.cookie('userSession',  email);
        res.redirect('http://localhost:3000/build')
    }catch(e){
        console.error('Error occured while authorizigin user', e);
    }
}

const getLoginStarted = async (req, res)=>{
    try {
        const fullUrl = await startLogin();
        res.redirect(fullUrl);
    }catch(e){
        console.error('Error occured during calling oauth for google :', e);
    }
}

module.exports = {
    handleGoogleCallback, getLoginStarted
};