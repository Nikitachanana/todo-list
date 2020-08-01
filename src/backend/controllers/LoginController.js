const dbConn = require("../databases/sqlite")
const User = dbConn.users;
const session = require("express-session");

function signin(req,res){
          var {email,password} = req.body;
        console.log(password);

        User.findOne({ where: { email: email }}).then(function (user) {
            if (!user) {
                console.log("not a user")
                res.redirect('/signin');
            } else if (user.dataValues.password !== password) {
                console.log("incorrect password")
                res.redirect('/signin');
            } else {
                console.log("success")
                req.session.userID = user.dataValues.id;
                res.redirect('/');
            }
        });
    };


module.exports ={signin:signin}
