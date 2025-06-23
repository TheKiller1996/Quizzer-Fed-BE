const {URL, URLSearchParams} = require('url');
const { env } = require('process');
const { configDotenv } = require('dotenv');
const { default: axios } = require('axios');
configDotenv();

const authenticateLogin = async (token)=>{

    const baseUrl = env.GOOGLE_OAUTH_BASE_URL;
    const res = await axios.get(`${baseUrl}/v3/tokeninfo?access_token=${token}`);
    if(res.data){
        return res.data;
    } 
    throw new Error('Invalid Token');
}

module.exports = {authenticateLogin}