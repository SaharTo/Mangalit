const express = require("express");
const router = express.Router();
//const passport = require("passport");
const users = require("../controllers/users");

router.get("/", users.printUser);
router.route("/:id")
    .get(users.userById)
    .put(users.updateUser)
    .delete(users.deleteUser);

router.post("/logout", users.logout);
router.post("/register", users.register);
router.post("/login", users.login);

module.exports = router;