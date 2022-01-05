const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");


module.exports.changePassword = async(req, res, next) => {
    const userName = req.body.user.userName;
    const user = await User.findOne({ userName });
    if (user.oldPassword == req.body.user.password) {
        const salt = await bcrypt.genSalt();
        const hashedPaswword = await bcrypt.hash(
            req.body.user.firstNewPassword,
            salt
        );
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
    const userName = req.body.user.userName;
    const user = await User.findOne({ userName });
    if (!user) res.status(400).send("משתמש לא קיים");
    //here I need to send to the User Email his new password
    const salt = await bcrypt.genSalt();
    const newPassword = Math.random()
        .toString(36)
        .slice(-8);
    const hashedPaswword = await bcrypt.hash(newPassword, salt);
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
        res.send("התנתקות");
    } catch {
        res.status(400).send("משהו השתבש");
    }
};

module.exports.login = async(req, res, next) => {
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
                req.session.user = newUser;
                req.session.save();
                res.send({
                    id: newUser._id,
                    isAdmin: newUser.isAdmin,
                });
            } else {
                res.status(404).send("סיסמא לא נכונה");
            }
        } catch (e) {
            res.status(404).send(e);
        }
    }
};

module.exports.register = async(req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPaswword = await bcrypt.hash(req.body.user.password, salt);
        const user = new User({
            userEmail: req.body.user.userEmail,
            userName: req.body.user.userName,
            password: hashedPaswword,
            fullName: req.body.user.fullName,
            isAdmin: false,
        });
        await user.save();
        res.send(user);
    } catch (e) {
        if (e.keyValue.userName) res.status(401).send("שם משתמש לא תקין");
        else if (e.keyValue.userEmail) res.status(401).send("מייל לא תקין");
        else res.status(401).send("משהו השתבש");
    }
};
module.exports.checkIfLoggedIn = async(req, res) => {
    if (req.session && req.session.user) {
        res.send(req.session.user._id);
    } else res.status(401).send("אין משתמש מחובר");
};
module.exports.checkIfIsAdmin = async(req, res) => {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        res.send(req.session.user.isAdmin);
    } else res.status(401).send("לא אדמין");
};