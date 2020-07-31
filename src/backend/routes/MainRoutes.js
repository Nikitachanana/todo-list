const express = require("express")
const app = express()
const router = express.Router()
const mainController = require("../controllers/MainController")
const rController =require("../controllers/RController")
const loginController = require("../controllers/LoginController")

router.route("/").get(mainController.checkSession, mainController.profile);
router.route("/signin").get(mainController.check, mainController.signin);
router.route("/signup").get(mainController.check,mainController.signup);
router.route("/signup").post( rController.signup)
router.route("/signout").post(mainController.logout)
router.route("/signin").post(loginController.signin)
router.route("/").post(mainController.addTodo)
module.exports = router;