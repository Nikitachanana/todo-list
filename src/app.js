const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const mainRoutes = require("./backend/routes/MainRoutes")
const session = require("express-session")
const cookieParser =require("cookie-parser")
app.use(cookieParser())
app.use(session({
    secret: "ANything",
    saveUninitialized : true,
    resave : true
}))
app.set("view engine",'ejs');
app.set("views",__dirname + "/client/views");
app.engine("html",require('ejs').renderFile);
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(logger('dev'))
app.use(express.static(__dirname+"/client/images"))

app.use(bodyParser.urlencoded({extended:true}));
app.use("/", mainRoutes);

app.set("port", process.env.PORT || 5000); //Line11
app.listen(app.get("port"), () => {
  console.log("Application running in port: " + app.get("port"));
});

module.exports = app;



