const jwt = require("jsonwebtoken");

exports.CookieAuth = (req, res, next) => {
    const token = req.cookies.token

    try{
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    }catch(err) {
        res.clearCookie("token");
        console.log(err)
    }
}