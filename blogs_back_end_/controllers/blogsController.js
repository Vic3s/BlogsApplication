const Account = require("../models/accounts");
const Blogs = require("../models/blog");

const blog_index = async (req, res) => {

    const response = await Blogs.find().sort({ createdAt: -1 });
    res.send(response)
}

const blog_details = (req, res) => {

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

}
const blog_creat_post = (req, res) => {

    const blog = new Blogs({title: req.body.title, snippet: req.body.snippet,
        body: req.body.body,  author: req.user._id}); 
    blog.save()
    .then((result) => res.redirect("/http://localhost:5000/"))
    .catch((err) => console.log(err));

}

const blog_delet = (req, res) => {

    //FINISH LATER


    // const id = req.params.id;

    // Blog.findByIdAndDelete(id)
    // .then((result) => {
    //     res.json({ redirect: "/blogs" });
    // })
    // .catch((err) => console.log(err))


}

module.exports = {

    blog_index,
    blog_details,
    blog_creat_post,
    blog_delet

}