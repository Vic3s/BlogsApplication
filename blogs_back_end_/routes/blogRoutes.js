const express = require("express");
const blogsController = require("../controllers/blogsController");

const router = express.Router();


router.get("/api/blogs/data", blogsController.blog_index);
router.post("/api/blogs/data", blogsController.blog_creat_post);
router.get("/api/blogs/:id", blogsController.blog_details);
router.delete("api/blogs/:id", blogsController.blog_delet);


module.exports = router;