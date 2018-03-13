//UserRoute.js
// importing the packages we need: express
// express is used for building the REST APIs
const express = require('express');
//setup express router
const router = express.Router();
// import mongoose schema
const User = require('../models/User');
//import crypting package
const bcrypt = require('bcrypt');
//get Users
router.get('/', (req, res, next) => {
	User.findUser((err, Users) => {
        if (err) {
            res.send(err);
        }
        res.json(Users);
	});
});
//post Users
router.post('/SignUp', (req, res, next) => {
    //before doing anything check if there is the same username in db
    const username = req.body.username;
	User.findUserByName(username, (err, Users) => {
        if (err) {
            res.send(err);
        }else if(Users){
            return res.status(409).json({
                message : 'Mail exists'
            })
        }
        res.json(Users);
	});
    //we can create the user only if we have a hash
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        //ifan error occured we don't
        if(err){
            return res.status(500).json({
                error : err
            });
        }else{
            const user = new User({
                "username" : req.body.username,
                "password" : hash,
                "name" : req.body.name,
                "email" : req.body.email
            });
            User.saveUser(user, (err) => {
                if (err)
                    res.send(err);
                    res.status(201).json(); 
            });
        }
    });
});
//get Users with symbol
router.post('/SignIn', (req, res, next) => {
	const username = req.body.username;
	User.findUserByName(username, (err, Users) => {
        if (err) {
            res.send(err);
        }
        res.json(Users);
	});
});

//update password
router.patch('/Update', (req, res, next) =>{
    //we can update the password only if we have a hash
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        //ifan error occured we don't
        if(err){
            return res.status(500).json({
                error : err
            });
        }else{
            const username = req.body.username;
            const password = hash;
            User.updateUser(username, password, (err) => {
                if(err) {
                    res.send(err);
                }
                res.json({message : 'password updated!'});
            });
        }
    });
});
module.exports = router;