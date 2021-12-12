const express = require("express");
const router = express.Router();
//const passport = require("passport");
const users = require("../controllers/users");
const { isAdmin } = require("../middleware");

router.get("/", users.printUser);
router.get("/checkIfLoggedIn", users.checkIfLoggedIn);
router
  .route("/:id")
  .get(users.userById)
  .put(isAdmin, users.updateUser)
  .delete(isAdmin, users.deleteUser);

router.post("/logout", users.logout);
router.post("/register", users.register);
router.post("/login", users.login);
router.post("/sendMyPassword", users.forgotPassword);

module.exports = router;
