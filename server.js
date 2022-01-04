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

const port = process.env.PORT || 3030
const dbUrl = process.env.DB_URL;
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
    methods: "GET, POST, PUT, DELETE",
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.set("trust proxy", 1);

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
        store: store,
        secret: process.env.SESSION_SECRET, //later we will take it from env file
        resave: false,
        name: "session",
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: false, maxAge: 24 * 360000 },
        store,
    })
);

app.set("trust proxy", 1); //backend in heroku 

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
app.use("/mangal/users/", require("./routes/user"));
app.use("/mangal/sideMeals/", require("./routes/sideMeals"));
app.use("/mangal/reviews/", require("./routes/review"));
app.use("/mangal/meals/", require("./routes/meals"));
app.use("/mangal/meats/", require("./routes/meats"));

// app.get('/**', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

const root = path.join(__dirname, 'public')
app.use(express.static(root));
app.get("/**", (req, res) => {
    res.sendFile('index.html', { root });
})

app.listen(port, function() {
    console.log("listening on port ", port);
});