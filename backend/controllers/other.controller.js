const utils = require("../utils").utils;
const sendResponse = utils.response.sendResponse;

/**
 * @name : otherMain
 * @description : just another function
 */
exports.otherMain = async (req, res, next) => {
  try {
    res["data"] = req.body;
    res["message"] = "Other Route Success";
    sendResponse(res);
  } catch (error) {
    res.message = error.message;
    res.code = 500;
    res.data = error;
    sendResponse(res);
  }
};
