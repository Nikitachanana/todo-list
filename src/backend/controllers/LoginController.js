const dbConn = require("../databases/sqlite")
const User = dbConn.User;
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
<<<<<<< HEAD
                res.redirect('/');
=======
                res.redirect("/");
>>>>>>> 6ab4dbd0263af9918c5df5a68fc2ed86c206c6e5
            }
        });
    };


module.exports ={signin:signin}
