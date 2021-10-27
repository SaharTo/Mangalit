const User = require("../models/user");
//functions that handle the render register and login pages an handle
//the register, login and logout functions issues.

module.exports.printUser = async (req, res, next) => {
  res.send(User);
};

module.exports.register = async (req, res, next) => {
  try {
    const { userEmail, username, password, fullName } = req.body;
    const user = new User(
      (userEmail = userEmail),
      (username = username),
      (password = password),
      (fullName = fullName)
    );
    /*const registeredUser = await User.register(user, password); 
    It's about the that module "passportLocalMongoose" in the model.*/

    /*req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/campgrounds");
    });*/
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};
