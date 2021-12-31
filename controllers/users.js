const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

//functions that handle the render register and login pages an handle
//the register, login and logout functions issues.
//const userModel = mongoose.model("User");
module.exports.changePassword = async(req, res, next) => {
    const userName = req.body.user.userName;
    const user = await User.findOne({ userName });
    // console.log("inside changePassword func ", user);
    if (user.oldPassword == req.body.user.password) {
        const salt = await bcrypt.genSalt();
        // console.log("The salt is:  " + salt);
        // console.log("The new password: ", req.body.user.firstNewPassword);
        const hashedPaswword = await bcrypt.hash(
            req.body.user.firstNewPassword,
            salt
        );
        // console.log("the new hashed password is :     " + hashedPaswword);
        user.password = hashedPaswword;
        await user.save();
        res.send("סיסמא שונתה");
    } else res.status(400).send("נתונים לא נכונים");
};
module.exports.forgotPassword = async(req, res, next) => {
    const mangalitEmail = {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASS,
    };
    // console.log("mangalitEmail ", mangalitEmail);
    const userName = req.body.user.userName;
    const user = await User.findOne({ userName });
    if (!user) res.status(400).send("משתמש לא קיים");
    // console.log("inside forgotpassword func ", user);
    //here I need to send to the User Email his new password
    const salt = await bcrypt.genSalt();
    // console.log("The salt is:  " + salt);
    const newPassword = Math.random()
        .toString(36)
        .slice(-8);
    // console.log("This is the new random password ", newPassword);
    const hashedPaswword = await bcrypt.hash(newPassword, salt);
    // console.log("the hashed password is :     " + hashedPaswword);
    user.password = hashedPaswword;
    await user.save();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.userEmail,
        subject: "שכחת את הסיסמא שלך למנגלית?",
        //text: `${newpassw}שחזרנו לך את הסיסמא, נא לא להגיב למייל זה, מנגלית :)`,
        html: `<div><p>הסיסמא החדשה שלך היא:<b> ${newPassword}</b></p><p>נא לא להשיב למייל זה,</p><p>צוות מנגלית :)</p></div>`,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(400).send(err);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
    await user.save();
    res.send("סיסמא שונתה");
};

module.exports.printUser = async(req, res, next) => {
    User.find({}, function(err, users) {
        res.send(users);
    });
};
module.exports.updateUser = async(req, res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {
        ...req.body.user,
    });
    await user.save();
    res.send("יוזר עודכן");
};

module.exports.userById = async(req, res, next) => {
    const user = await User.findById(req.params.id);
    res.send(user);
};

module.exports.deleteUser = async(req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("יוזר נמחק");
};

module.exports.userByName = async(req, res, next) => {
    const users = await User.find({});
    const user = await users.find(
        (user) => user.userName == req.body.user.userName
    );
    res.send(user);
};

module.exports.logout = async(req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    try {
        req.session.destroy();
        //res.json(req.session);
        res.send("התנתקות");
    } catch {
        res.status(400).send("משהו השתבש");
    }
};

module.exports.login = async(req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // then validate the response from a database or external api
    // console.log("entered the login controller func");
    const users = await User.find({});
    const user = await users.find(
        (user1) => user1.userName == req.body.user.userName
    );
    if (!user) {
        res.status(404).send("שם משתמש לא קיים , נסה שוב ");
    } else {
        try {
            if (await bcrypt.compare(req.body.user.password, user.password)) {
                const newUser = {
                    userName: user.userName,
                    fullName: user.fullName,
                    userEmail: user.userEmail,
                    isAdmin: user.isAdmin,
                    _id: user._id,
                };
                // console.log("before userController ", req.session);
                req.session.user = newUser;
                await req.session.save();
                //req.session.user.save();
                //console.log("login controller session ", req.session);
                res.send({ id: newUser._id, isAdmin: newUser.isAdmin });
            } else {
                res.status(404).send("סיסמא לא נכונה");
            }
        } catch (e) {
            res.status(404).send(e);
            // console.log(e);
        }
    }
};

module.exports.register = async(req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        // console.log("The salt is:  " + salt);
        // console.log(req.body.user.password);
        const hashedPaswword = await bcrypt.hash(req.body.user.password, salt);
        // console.log("the hashed password is :     " + hashedPaswword);
        const user = new User({
            userName: req.body.user.userName,
            password: hashedPaswword,
            userEmail: req.body.user.userEmail,
            fullName: req.body.user.fullName,
            isAdmin: false,
            // pay attention to the fact that we need to insert the rest of the fields (userEmail, fullName)
        });
        // console.log(user);
        await user.save();
        // console.log("success this is the hashed password" + hashedPaswword);
        res.send(user);
    } catch (e) {
        // console.log(e);
        res.status(401).send("שם משתמש לא תקין");
    }
};
module.exports.checkIfLoggedIn = async(req, res) => {
    // console.log("inside check ifLoggedIn func ", req.session);
    if (req.session && req.session.user) {
        res.send(req.session.user._id);
    } else res.status(401).send("אין משתמש מחובר");
};
module.exports.checkIfIsAdmin = async(req, res) => {
    // console.log("inside check ifAdmin func ", req.session);
    if (req.session && req.session.user && req.session.user.isAdmin) {
        res.send(req.session.user.isAdmin);
    } else res.status(401).send("לא אדמין");
};