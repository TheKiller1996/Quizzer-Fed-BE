const { configDotenv } = require('dotenv');
const { env } = require('process');
const {authenticateLogin} = require('../service/loginService');
const redisClient = require('../common/redis');

configDotenv();

const handleUserLogin = async (req, res)=>{
    try{
        console.log(req.cookies);
        const sessionId = req.cookies.userSession;
        if(!sessionId){
            return res.status(401).json({
                error: 'Unauthenticated user'
            });
        }
        const token = await redisClient.get(sessionId);

        console.log(token);

        const refreshToken = await authenticateLogin(token);

        console.log(refreshToken)

        redisClient.set(sessionId, refreshToken)
        res.cookie('userSession',  sessionId, {
            httpOnly: true,      
            secure: false,   
            sameSite: 'lax',
            maxAge: 24 * 1000
        });
        return res.status(200).json({
            data: 'Login Sucess'
        });
    }catch(e){
        return res.status(401).json({
            error: 'Error Authenticating User'
        });
    }
}

module.exports = {
    handleUserLogin
};