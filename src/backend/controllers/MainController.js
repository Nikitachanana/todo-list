const session = require("express-session")
const dbConn = require("../databases/sqlite")
const User = dbConn.User;
const List = dbConn.lists;

function checkSession(req, res, next) {
    if (!req.session.userID) {
        res.redirect("/signin")
    } else {
        next()
    }
};

function logout(req, res) {
    // if(req.session.id){
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            res.redirect("/");
        }
        else {
            res.redirect("/signin")
        }
    })

}

function signup(req, res) {
    res.render("signup")
}

function signin(req, res) {
    res.render("signin")
}
function profile(req, res) {
    console.log(req.session.userID);
    const id = req.session.userID;
    List.findAll({ where: { user_id: id } }).then((data) => {
        var todo = []
        for(i of data){
            todo.push(i.dataValues)
        };
        console.log("Todo for user is =>", todo);
        return res.render("profile",{
            todo : todo})
    }).catch(err => {
        console.log("Error in profile function is =>\n",err);
        return res.render("profile")
    });
};

function check(req, res, next) {
    if (req.session.userID) {
        console.log(req.session.id)
        res.redirect("/")
    } else {
        next();
    };
};

function addTodo(req, res) {
    var { item } = req.body;
    var user_id = req.session.userID;
    var edit = false;
    var done = "no";
    // const user_id = req.session.userId
    if (!item) {
        console.log("todo value received was blank");
        return res.redirect("/")
    } else {
        List.create({
            item: item,
            edit: edit,
            done: done,
            user_id: user_id

        }).then((todo) => {
            // console.log("todo has been created with values", todo);
            res.redirect("/");
        }).catch(err => {
            console.log("Error while creating todo=>\n", err);
            res.redirect("/");
        });
    }
}
module.exports = {
    signup: signup,
    signin: signin,
    profile: profile,
    checkSession: checkSession,
    check: check,
    logout: logout,
    addTodo: addTodo

}
