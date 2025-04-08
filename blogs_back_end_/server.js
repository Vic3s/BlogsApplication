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
const { error } = require("console");

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
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));
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

// app.use("/blogs", blogRourts);

// BLOGS ROUTES

app.get("/api/blogs/data", async (req, res) => {

    Blogs.find().sort({ createdAt: -1 })
    .then((result) => {
        // if(req.isAuthenticated()){
        //     // res.send({result: result, user: req.user});
        //     res.send({result: result});

        // }else{
        //     // res.send({result: result, user: false});
        //     res.send({result: result});
        // }
        res.send({result: result})
    })
    .catch(err => console.log(err))

})

app.post("/api/blogs/data", (req, res) => {
    // if(req.user){
    //     const blog = new Blogs({title: req.body.title, snippet: req.body.snippet,
    //         body: req.body.body, author: req.user._id}); 
    // }
    const blog = new Blogs({title: req.body.title, snippet: req.body.snippet,
        body: req.body.body, author: "unknown"});
    
    
    blog.save()
    
    .then((result) => res.status(201).json({ message: 'Blog created' }))
    .catch((err) => console.log(err));
        
})

app.delete("/api/blogs/:id", (req, res) => {

    //FINISH LATER


    // const id = req.params.id;

    // Blog.findByIdAndDelete(id)
    // .then((result) => {
    //     res.json({ redirect: "/blogs" });
    // })
    // .catch((err) => console.log(err))


})

app.get("/api/blogs/:id", (req, res) => {

    //FINISH LATER

    // const id = req.params.id;
    
    // Blog.findById(id)
    // .then(async (result) => {
    //     const author = await Account.findById(result.author)
    //     .then(result => {return result.name})
    //     .catch(err => consol.log(err))

    //     res.render("details", {blog: {title: result.title, body: result.body, author: author}, title: "Blog details" }) 
    // })
    // .catch((err) => { res.status(404).render("404", {title: "404-NotFound"})});

})

// SIGNUP PAGE POST

app.post("/api/signup/data", async (req, res) => {
    const hashed_pass = await bcrypt.hash(req.body.password, 10);
    const new_account = new Account({email: req.body.email, name: req.body.name, password: hashed_pass});

    new_account.save()
    .then(result => {
        res.send({message: "The account has been created!"})
    }).catch(err => console.log(err))
})

// LOGIN PAGE POST

app.post("/api/login/data", (req, res, next) => {passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).send({ message: 'Invalid credentials' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.send({ message: 'Login successful', user });
    });
  })(req, res, next)
});

// LOGOUT PAGE DELETE REQ

app.delete('/logout', (req, res) => {
    req.logOut(() => {});
    res.redirect('http://localhost:3000/login');
})

//RETURN USER IF AUTHENTICATED AND STORED IN SESSION

app.get("/api/account/data", (req, res) => {
    if(req.user) {
        console.log(req.isAuthenticated())
        console.log(req.user)
        res.send({user: req.user})
    }else{
        console.log(req.user)
        console.log("else statment")
        res.send({user: false})
    }
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