const User = require("../models/user");
const bcrypt = require("bcrypt");
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
  /* const user = new User();
  user.userEmail = "Successfull";
  user.userName = "successinguname";
  user.password = "EasyPassword";
  user.fullName = "mitzi awoooo";
  await user.save();
  res.send(user);
  This is working -Hard Code- just put it inside the try method
  */

  try {
    const salt = await bcrypt.genSalt();
    console.log("The salt is:  " + salt);
    console.log(req.body.password);
    const hashedPaswword = await bcrypt.hash(req.body.password, salt);
    console.log("the hashed password is :     " + hashedPaswword);
    const user = new User({
      userName: req.body.userName,
      password: hashedPaswword,
      userEmail: req.body.userEmail,
      fullName: req.body.fullName,
      // pay attention to the fact that we need to insert the rest of the fields (userEmail, fullName)
    });
    console.log(user);
    await user.save();
    console.log("success this is the hashed password" + hashedPaswword);
    res.send(user);
  } catch (e) {
    console.log(e);
    res.redirect("/users");
  }
};
