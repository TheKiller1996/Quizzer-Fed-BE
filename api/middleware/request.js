const namespace = require('../common/cls');

const requestMiddleware = (req, res, next)=>{
    namespace.run(()=>{
        const reqId = req.headers['x-request-id'];
        namespace.set('requestId', reqId);

        hydrateContextWithUser(namespace);
        next();
    });
}

const hydrateContextWithUser = (namespace)=>{

}

module.exports = requestMiddleware;