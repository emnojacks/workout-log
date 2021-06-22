require("dotenv").config();
const Express = require("express");
//create instance of express so we can run express app
const app = Express();
const dbConnection = require('./db');
const controllers = require("./controllers");

//add middleware func 
//headers must be sent before routes are declared 
//this takes cares of CORS errors 
app.use(require('./middleware/headers'));


//this must go above any route statements bc all res must be jsonifiied 
app.use(Express.json());


//ENDPOINTS 


//WORKOUT LOG ENDPOINT
app.use("/log", controllers.logController);
//USER ENDPOINT
app.use("/user", controllers.userController);

//authenticate the user 
dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });