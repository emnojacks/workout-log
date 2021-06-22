//package imports
const router = require('express').Router();
const { User } = require('../models');
//const { UniqueConstraintError } = require('sequelize/types');
const { UniqueConstraintError } = require('sequelize/lib/errors');
/*
^^combined two lines of code. We import the Express framework and access the Router()  method, assigning it to a variable called router. Recall that we are setting this variable as a const because we don't want to be able to change the value of this variable
 We use object deconstructing to import the user model and store it in UserModel variable. 
*/
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//==================
//WOL USER REGISTER
//==================

router.post('/register', async(req, res) => {

    let { username, passwordhash } = req.body.user;
    try {
        const newUser = await User.create({
            username,
            passwordhash: bcrypt.hashSync(passwordhash, 13),
        });
        let token =
            //creates an object of id with value of User.id 
            jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "14d" });

        res.status(201).json({
            //always good practices to add an add'ln msg 
            message: "User successfully registered.  Welcome to your journey to fitness.",
            user: newUser,
            //adding property called sessionToken and giving it val of token to the body of the response
            sesionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Be more unique. Username already in use",
            });
        } else {
            res.status(500).json({
                message: "Bummer. Failed to register user",
            });
        }
    }
});

//==================
//WOL USER LOGIN 
//==================

router.post("/login", async(req, res) => {
    let { username, passwordhash } = req.body.user;

    try {
        //we await the data response and store it in an object called loginuser
        let registeredUser = await User.findOne({
            //we filter what to look for with a where clause 
            where: {
                username: username,
            },
        });
        //check whether the registeredUser object is true or false
        //if the object is null it is falsy and therefore the catch block is triggered
        if (registeredUser) {
            //bcrypt compare method acceps 4 params - pswd string, hash, failure callback func, progress / resolution callback func,
            //if callback funcs ommitted there is a boolean returned in a promise - which is why we use await 
            let passwordComparison = await bcrypt.compare(passwordhash, registeredUser.passwordhash);
            if (passwordComparison) {
                let token =
                    jwt.sign({ id: registeredUser.id }, process.env.JWT_SECRET, { expiresIn: "14d" });
                res.status(200).json({
                    //always good practices to add an add'ln msg 
                    //this body key value pair must match the const object you are creating in the 
                    //await async func above
                    user: registeredUser, //this will pop out multiple key val pairs of user - it's an object of the registered user
                    message: "Workout logger successfully logged in",
                    sessionToken: token,
                });
            } else {
                res.status(401).json({
                    message: "Incorrect username or password",
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect username or password",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to log in user",
        })
    }
});

module.exports = router;