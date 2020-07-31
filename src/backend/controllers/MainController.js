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
            req.session.todoID = todo.dataValues.id;
            res.redirect("/");
        }).catch(err => {
            console.log("Error while creating todo=>\n", err);
            res.redirect("/");
        });
    }
}

function del(req,res){
    var lisId = req.params.id;
    console.log(lisId)
    List.destroy({where :{ id: lisId}})
    .then(()=>{ return res.redirect("/")
    }).catch(err=>{
        console.log(err)
    })
}

function done(req,res){
    var lisId = req.params.id;
    List.findOne({where: {id:lisId}}).then((data)=>{
        if(data.dataValues.done ==="no"){
            console.log("value before"+data.dataValues.done)
            List.update({done:"yes"},{where :{id:lisId}});
            console.log("value after"+data.dataValues.done)
            return res.redirect("/")
        }else if(data.dataValues.done ==="yes"){
            console.log("value before"+data.dataValues.done)
            List.update({done:"no"},{where :{id:lisId}});
            console.log("value after"+data.dataValues.done)
            return res.redirect("/")
        };
    }).catch(err=>{
        console.log(err)
    })
};

function edit(req,res){
    var data = req.body.item;
    var lisId = req.params.id;
    List.findOne({where: {id:lisId}}).then(()=>{
        List.update({item:data},{where:{id:lisId}});
        return res.redirect("/")
    }).catch(err=>{console.log(err)})
}

module.exports = {
    signup: signup,
    signin: signin,
    profile: profile, 
    checkSession: checkSession,
    check: check,
    logout: logout,
    addTodo: addTodo,
    del:del,
    done:done
}
