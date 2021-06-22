//req refers to request from the client 
//which types aof headers are allowed by the server 

module.exports = function(req, res, next) {
    //res.header allows server to respond witht the following headers
    //tells server which specific origins are allowed to communicate with the db
    res.header("access-control-allow-origin", "*");
    //types of HTTP request allowable
    res.header("access-control-allow-methods", "GET, POST, PUT, DELETE");
    //specific header types allowed by the server
    res.header("access-control-allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //next sends requesti along to next destimation
    //continue process with next func 
    next();
};