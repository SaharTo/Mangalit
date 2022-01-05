const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.
// you have to -- npm install passport mongoose passport-local-mongoose --.
// more here: https://www.npmjs.com/package/passport-local-mongoose
//const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    isAdmin: Boolean,
});

module.exports = mongoose.model("User", UserSchema);