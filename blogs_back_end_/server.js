require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const blogRourts = require("./routes/blogRoutes.js");   
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const method_override = require('method-override');
const cors = require("cors");

const init_passport = require("./public/passport_configuraion/passport.js")
const Account = require("./models/accounts");
const Blogs = require("./models/blog.js");

const app = express();

// INITIALIZE PASSPORT CONFIG  

init_passport(passport,
     async (email) => {
        try{
            const result = await Account.findOne({email: email});
            return result;

        }catch(e){
            console.log(e)
            return null;
        }
    },
    async (id) => {
        try{
            const result = await Account.findOne({_id: id});
            return result;
            
        }catch(e){
            console.log(e)
            return null;
        }
})

//APP CONFIG

app.set('view engine', "ejs");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

//PASSPORT SETTINGS SETUP

app.use(passport.initialize());
app.use(passport.session());
app.use(method_override('_method'));

//BLOGS ROUTER IMPORT

app.use("/blogs", blogRourts);

app.get("/api/blogs/data", async (req, res) => {

    Blogs.find().sort({ createdAt: -1 })
    .then((result) => {
        if(req.isAuthenticated()){
            res.send({result: result, user: req.user});
        }else{
            res.send({result: result, user: null});
        }
    })
    .catch(err => console.log(err))

})

// SIGNUP PAGE POST

app.post("/signup/data", checkNotAuthenticated, async (req, res) => {
    const hashed_pass = await bcrypt.hash(req.body.password, 10);
    const new_account = new Account({email: req.body.email, name: req.body.name, password: hashed_pass});

    new_account.save()
    .then(result => {
        res.redirect("http://localhost:3000/")
    }).catch(err => console.log(err))
})

//TEST SECTION WITH REACT 

// LOGIN PAGE POST

app.post("/login", passport.authenticate('local', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/login',
    failureFlash: true
}))

// LOGOUT PAGE DELETE REQ

app.delete('/logout', (req, res) => {
    req.logOut(() => {});
    res.redirect('http://localhost:3000/login');
})

//CHECK AUTHENTICATION

function checkAuthenticated (req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/login');
}

//CHECK NOT AUTHENTICATED

function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

//DATABASE CONNECTION FUNC

mongoose.connect(process.env.DB_STRING)
    .then((result) => { 
        app.listen(process.env.PORT);
        
    })
    .catch((err) => { console.log("There was an error", err)});