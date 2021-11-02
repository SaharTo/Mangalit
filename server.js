//console.log("May Node be with you");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const dbUrl =
    "mongodb+srv://Toledanos:s318720034@cluster0.jd0ti.mongodb.net/Mangalit?retryWrites=true&w=majority";
// Make sure you place body-parser before your CRUD handlers!/
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", (_) => {
    console.log("Database connected:", dbUrl);
    // db.collection('Users').insertOne(user); //add user to DB
});

db.on("error", (err) => {
    console.error("connection error:", err);
});

//CRUD Handlers.
app.get("/", (req, res) => {
    res.send("Wellwou World");
    //res.sendFile(__Dirname + './index.html')
});

// app.all("*", (req, res, next) => {
//     // next(new ExpressError("Page Not Found", 404));
// });
app.use("/users/", require("./routes/user"))
app.use("/sideMeals/", require("./routes/sideMeals"))
app.use("/meals/", require("./routes/meals"))
app.use("/reviews/", require("./routes/review"))

app.listen(3000, function() {
    console.log("listening on port 3000");
});