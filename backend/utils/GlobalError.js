

// fileErrorHandler.js
export const GlobalError = (err, req, res, next) => {

    return res.status(500).json({
        success: false,
        message : err.message + "(Something went wrong)"
    });
};