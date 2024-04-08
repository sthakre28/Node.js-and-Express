const { constants } = require("../constants")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.NOT_FOUND:
            res.json({
                message: err.messsage,
                stackTrace: err.stack.err,
                title: "Not Found"
            });
            break;
        case constants.VALIDATAION_ERROR:
            res.json({
                message: err.messsage,
                stackTrace: err.stack.err,
                title: "Validation Failed"
            });
        case constants.UNAUTHORIZED:
            res.json({
                message: err.messsage,
                stackTrace: err.stack.err,
                title: "UNAUTHORIZED"
            });
        case constants.FORBIDDEN:
            res.json({
                message: err.messsage,
                stackTrace: err.stack.err,
                title: "FORBIDDEN"
            });
            case constants.SERVER_ERROR:
            res.json({
                message: err.messsage,
                stackTrace: err.stack.err,
                title: "SERVER_ERROR"
            });
        default:
            console.log('No Error All Good')
            break;
    }
};

module.exports = errorHandler;