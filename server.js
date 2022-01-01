//console.log("May Node be with you");
const express = require("express");
const app = express();
const path = require('path')
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const dbUrl = process.env.DB_URL;

const port = process.env.PORT || 3030
mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", (_) => {
    console.log("Database connected:", dbUrl);
});

db.on("error", (err) => {
    console.error("connection error:", err);
});

// for front accses
const corsOptions = {
    origin: [
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        // "https://mangal-it.com",
    ],
    credentials: true,
};

app.use(cors(corsOptions));

const store = new MongoStore({
    mongoUrl: dbUrl,
    autoRemove: "native",
});
store.on("error", (e) => {
    console.log("store error", e);
});

app.use(
    session({
        secret: process.env.SESSION_SECRET, //later we will take it from env file
        resave: false,
        name: "session",
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: false, maxAge: 24 * 360000 },
    })
);
// Make sure you place body-parser before your CRUD handlers!/
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//CRUD Handlers.
// app.get("/", (req, res) => {
//     // res.send("Wellwou World");
//     // res.sendFile(__Dirname + './index.html')
//     // res.sendFile(path.join(__dirname, 'public', 'index.html'))

// });

// app.all("*", (req, res, next) => {
//     // next(new ExpressError("Page Not Found", 404));
// });
app.use("/users/", require("./routes/user"));
app.use("/sideMeals/", require("./routes/sideMeals"));
app.use("/reviews/", require("./routes/review"));
app.use("/meals/", require("./routes/meals"));
app.use("/meats/", require("./routes/meats"));

// app.get('/**', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

const root = require('path').join(__dirname, 'public')
app.use(express.static(root));
app.get("/**", (req, res) => {
    res.sendFile('index.html', { root });
})

app.listen(port, function() {
    console.log("listening on port ", port);
});