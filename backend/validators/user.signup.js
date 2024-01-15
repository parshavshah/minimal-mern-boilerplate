const joi = require('@hapi/joi');
const sendResponse = require('../utils').utils.response.sendResponse

module.exports = async (req, res, next) => {
    try {

        const userBody = joi.object({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required()
        })

        let result = await userBody.validateAsync(req.body).catch((error) => {
            res['data'] = error;
            res['message'] = "Validation Error";
            res['code'] = 500;
            throw res;
        })

        if (result) {
            next();
        }

    } catch (error) {
        sendResponse(error)
    }
}