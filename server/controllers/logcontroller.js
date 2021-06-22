//This file creates ROUTES to the API and server

//DECLARE VARS
const Express = require("express");
const router = Express.Router();
const validateSession = require("../middleware/validate-session");
//import Log model
const { Log, User } = require("../models")

router.get('/practice', (req, res) => {
    res.send("Hey, this is a practice route");
    //res = response and .send is a method that packages up the response which in this case is just a string
});

/*
CREATE NEW WORK OUT LOG
 */
router.post("/", validateSession, async(req, res) => {
    console.log("Create a new post");
    let { description, definition, result } = req.body.log;
    const { id } = req.user;
    //the id comes from the id column in the user table which exists bc the user exists if they can create a log
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await Log.create(logEntry);
        res.status(201).json(newLog);
        res.send("New work out log sucessfully created - keep up the good work")
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//-- -- -- -- -- -- -- --
//GET ALL WORKOUT LOGS FOR USER
//-- -- -- -- -- -- -- -- --

router.get("/", validateSession, async(req, res) => {
    try {
        const userLogs = await Log.findAll();
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//-- -- -- -- -- -- -- --
////GET ALL WORKOUT LOGS FOR IND USER BY ID 
//-- -- -- -- -- -- -- -- --

router.get("/:id", validateSession, async(req, res) => {
    const { id } = req.user;
    try {
        const userLogs = await Log.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
});


//-- -- -- -- -- -- -- --
//UPDATE WORKOUT LOGS BY ID  
//-- -- -- -- -- -- -- -- --

router.put("/:id", validateSession, async(req, res) => {
    const { description, definition, result } = req.body.log;
    //pulls log id from the URL / search from user 
    const logId = req.params.id;
    //req here is pulled from request headers 
    const userId = req.user.id;
    //makes it easier for user to find the journal they want to update
    const query = {
        where: {
            id: logId,
            owner_id: userId
        }
    };
    //create new entry
    const updatedLog = {
        description: description,
        definition: definition,
        result: result
    };
    try {
        //update is sequelize method that takes two args - first is object holding the new value, and second is where to place new data
        const update = await Log.update(updatedLog, query);
        res.status(200).json(update);
        res.send("Log successfully updated")
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//-- -- -- -- -- -- -- --
//DELETE WORKOUT LOGS BY ID  
//-- -- -- -- -- -- -- -- --
// when you append the :id you can pass a param to the url
router.delete("/:id", validateSession, async(req, res) => {
    const userId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId,
                owner_id: userId
            }
        };

        await Log.destroy(query);
        res.status(200).json({ message: "Workout log entry deleted" });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});


router.get('/about', (req, res) => {
    res.send("This is the about route");
    //res = response and .send is a method that packages up the response which in this case is just a string
});


//we export module for access and use outside of this file 
module.exports = router;