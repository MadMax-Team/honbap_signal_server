const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { errResponse } = require("./response")
const { logger } = require('./winston');
const baseResponse = require("./baseResponseStatus");
const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWTSECRET

// route로 보내기 전에 검증만. 생성 X
const jwtMiddleware = (req, res, next) => {
    // read the token from header or url
        const token = req.headers['x-access-token'] || req.query.token;
        // token does not exist
        if(!token) {
            logger.error("jwt token empty");
            return res.send(errResponse(baseResponse.TOKEN_EMPTY));
        }

        // create a promise that decodes the token
        const p = new Promise(
            (resolve, reject) => {
                jwt.verify(token, jwtsecret, (err, verifiedToken) => {
                    if(err) 
                    {
                        logger.error("jwt token reject");
                        reject(err);
                    }
                    resolve(verifiedToken)
                })
            }
        );

        // if it has failed to verify, it will return an error message
        const onError = (error) => {
            return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE))
        };
        // process the promise
        p.then((verifiedToken)=>{
            // 검증 완료된 token -> request에 넣어서 route로 전송.
            req.verifiedToken = verifiedToken;
            next();
        }).catch(onError)
};

module.exports = jwtMiddleware;