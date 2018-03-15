// UserRoute.js
// Root : /user
/*
    Routes : 
        /info : GET informations about current user (name, email and username)
*/

const express = require('express');
// setup express router
const router = express.Router();
// import mongoose schema
const User = require('../models/User');

//Get the latest quotes for a symbol
router.get('/info', (req, res) => {
    const user = {name : 'Account name', email : 'email@email.com', username : 'user_2016'};

    /*User.findUserByName(username, (err, Users) => {
			if (err) {
					res.send(err);
			}else if(Users){
					return res.status(409).json({
						message : 'Mail exists'
					});
			}
			res.json(Users);
	});*/
    res.send({ user : user });
});

module.exports = router;