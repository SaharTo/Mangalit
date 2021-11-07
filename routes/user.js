const express = require("express");
const router = express.Router();
//const passport = require("passport");
const users = require("../controllers/users");

// router.route("/register").get(users.printUser).post(users.register);
router.get("/", users.printUser);
//router.get("/logout", users.logout);
router.get("/:id", users.userById);
router.post("/register", users.register);
router.post("/login", users.login);

module.exports = router;
