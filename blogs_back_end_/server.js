require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const Account = require("./models/accounts");
const Blogs = require("./models/blog.js");
const CookieAuth = require("./public/JWT/CookieJwtAuth").CookieAuth;

const app = express();

//APP CONFIG
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(morgan("dev"));

// BLOGS ROUTES

app.get("/api/blogs/data", async (req, res) => {

    Blogs.find().sort({ createdAt: -1 })
    .then((result) => {
        res.send({result: result})
    })
    .catch(err => console.log(err))

})

app.post("/api/blogs/create", CookieAuth, (req, res) => {

    const blog = new Blogs({title: req.body.title, snippet: req.body.snippet,
        body: req.body.body, author: req.user._id});

    blog.save()
    
    .then((result) => res.status(201).json({ message: 'Blog created' }))
    .catch((err) => console.log(err));
    
})

app.get("/api/blogs/:id", async (req, res) => {

    const id = req.params.id;
    
    await Blogs.findOne({_id: id})
    .then(async (result) => {
        console.log(result.author)
        const authorObj = await Account.findOne({_id: result.author})
        .then(result => {return result})
        .catch(err => console.log(err))

        res.send({blog: result, authorName: authorObj.name })
    })
    .catch((err) => { res.status(404).json({error: "* Blog Doesnt exist! *"})});


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

app.post("/api/login/data", async (req, res) => {

    const {email, password} = req.body;

    const user = await Account.findOne({email: email})
    .then(result => {return result})
    .catch(err => console.log(err));

    if(!bcrypt.compare(password, user.password)){
        return res.status(403).json({error: '* Invalid Credentials! *'});
    }

    const token = jwt.sign(user.toObject(), process.env.SECRET, {expiresIn: "30m"})

    res.cookie("token", token, {
        httpOnly: true
    });

    res.send({message: "Login Successful!"});

})

// LOGOUT PAGE DELETE REQ

// FINISH LATER

// app.delete('/logout', (req, res) => {
//     res.redirect('http://localhost:3000/login');
// })

//RETURN USER IF AUTHENTICATED AND STORED IN COOKIES

app.get("/api/account/data", CookieAuth, (req, res) => {
    if (req.user) {
        return res.send({ user: req.user });
    } else {
        return res.status(401).send({ message: '* Not authenticated! *' });
    }
})

//DATABASE CONNECTION FUNC

mongoose.connect(process.env.DB_STRING)
    .then((result) => { 
        app.listen(process.env.PORT);
        
    })
    .catch((err) => { console.log("There was an error", err)});