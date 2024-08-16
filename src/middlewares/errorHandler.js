

const errorHandler = (err, req, res, next) => {
    // Log the error stack (for development)
    console.error(err.stack);

    // Set the response status code
    const statusCode = err.status || 500;

    // Send error response
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) 
    });
};

module.exports = errorHandler;