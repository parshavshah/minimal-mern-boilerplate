var jwt = require('jsonwebtoken');
require('dotenv').config()
const sendResponse = require('../utils').utils.response.sendResponse

exports.authUser = async (req, res, next) => {
    try {
        let curruntTime = +new Date();
        jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET, (error, decoded) => {
            if (error) {
                throw error;
            }
            if (decoded.exp <= curruntTime) {
                req.user = decoded['data'];
                next();
            } else {
                throw new Error("Something went wrong, Please login again.");
            }
        });
    } catch (error) {
        res['message'] = error.message;
        res['data'] = error;
        res['code'] = 401;
        sendResponse(res);
    }
}
