const User = require("../models/user");

//functions that handle the render register and login pages an handle
//the register, login and logout functions issues.
//const userModel = mongoose.model("User");

module.exports.printUser = async (req, res, next) => {
  /* const userM = new userModel();
   userM.username = 'Master www';
   userM.userEmail = 's111@gmail.com';
   userM.password = '111';
   userM.fullName = 'www';
   await userM.save();*/

  User.find({}, function (err, users) {
    res.send(users);
  });
};

module.exports.userById = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.send(user);
};

module.exports.register = async (req, res) => {
  const user = new User();
  user.userEmail = "Successfull";
  user.userName = "successinguname";
  user.password = "EasyPassword";
  user.fullName = "mitzi awoooo";
  // try {
  //const { userEmail, username, password, fullName } = req.body;
  await user.save();
  res.send(user);

  /*const registeredUser = await User.register(user, password); 
        It's about the that module "passportLocalMongoose" in the model.*/
  /*req.login(registeredUser, (err) => {
          if (err) return next(err);
          req.flash("success", "Welcome to Yelp Camp!");
          res.redirect("/campgrounds");
        });*/
  //} catch (e) {
  //req.flash("error", e.message);
  //  console.log(e);
  // res.redirect("/users");
  // }
};
