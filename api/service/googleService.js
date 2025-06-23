const {URL, URLSearchParams} = require('url');
const { env } = require('process');
const { configDotenv } = require('dotenv');
const { default: axios } = require('axios');
configDotenv();

const startLogin = async ()=>{

    const googleUrl = env.GOOGLE_OAUTH_URL;
    const clientId = env.GOOGLE_CLIENT_ID;
    //const clientSecret = env.GOOGLE_CLIENT_SECRET;
    const redirectUrl = env.REDIRECT_URI;

    const fullUrl = new URL(googleUrl);
    const params = new URLSearchParams({
        'client_id':clientId,
        'redirect_uri': redirectUrl,
        'response_type': 'code',
        'scope': 'profile email'
    });

    fullUrl.search = params.toString();

    return fullUrl.toString();
}

const fetchToken = async (url, code)=>{

    const clientId = env.GOOGLE_CLIENT_ID;
    const clientSecret = env.GOOGLE_CLIENT_SECRET;
    const redirectUrl = env.REDIRECT_URI;

    const {data} = await axios.post(url, {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUrl,
        grant_type: 'authorization_code'
    })

     const { access_token, id_token } = data;

    const {data: profile} = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo',{
      headers: { Authorization: `Bearer ${access_token}` }});
    return {token : access_token, email: profile.email};
}

module.exports = {startLogin, fetchToken}