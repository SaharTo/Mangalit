const User = require("../models/user");
const bcrypt = require("bcrypt");
//functions that handle the render register and login pages an handle
//the register, login and logout functions issues.
//const userModel = mongoose.model("User");

module.exports.printUser = async (req, res, next) => {
  User.find({}, function (err, users) {
    res.send(users);
  });
};

module.exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, {
    ...req.body.user,
  });
  await user.save();
  res.send("user updated succssesfully");
};

module.exports.userById = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.send(user);
};

module.exports.deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/users");
};

module.exports.userByName = async (req, res, next) => {
  const users = await User.find({});
  const user = await users.find(
    (user) => user.userName == req.body.user.userName
  );
  res.send(user);
};

module.exports.logout = async (req, res, next) => {
  try {
    req.session.user = null; //req.session.destroy()
    res.json(req.session);
    //res.send("Successfully logout");
  } catch {
    res.send("Something went wrong");
  }
};

module.exports.login = async (req, res, next) => {
  console.log("entered the func");
  const users = await User.find({});
  const user = await users.find(
    (user1) => user1.userName == req.body.user.userName
  );
  console.log("This is the user:    " + user);
  if (user == null) {
    res.send("There is no such a user, please try again");
  }
  try {
    if (await bcrypt.compare(req.body.user.password, user.password)) {
      const newUser = {
        userName: user.userName,
        fullName: user.fullName,
        userEmail: user.userEmail,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      console.log("user after", newUser);
      req.session.user = newUser;
      res.json(req.session);
      //res.send("successfull login");
    } else {
      res.send("Not Allowed");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    console.log("The salt is:  " + salt);
    console.log(req.body.user.password);
    const hashedPaswword = await bcrypt.hash(req.body.user.password, salt);
    console.log("the hashed password is :     " + hashedPaswword);
    const user = new User({
      userName: req.body.user.userName,
      password: hashedPaswword,
      userEmail: req.body.user.userEmail,
      fullName: req.body.user.fullName,
      isAdmin: false,
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
