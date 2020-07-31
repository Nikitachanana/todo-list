const dbConn = require("../databases/sqlite.js"); //Line1
const User = dbConn.User; //Line2

function signup(req, res) {
      const { name, email, password } = req.body;        
     if (!(name && email && password))                  
        return res.render("signup", {                    
          msg: "Please enter all the required details"
        });
      else {
        User.create({          
          name,
          email,
          password
        })
          .then(user => {
        console.log("Registered user details are",user);
        req.session.userID = user.dataValues.id;
        console.log(req.session.userID)
        console.log(user.dataValues.id)
        console.log(user.dataValues.name)
        res.redirect('/');
    })
        .catch(error => {
        console.log("Error while signup =>\n",error);
        res.redirect('/signup');
    });
      }
    }

module.exports = {
    signup: signup
};
