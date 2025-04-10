const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcrypt");

function init_passport(passport, getUserByEmail, getUserById){

    const authUser = async (email, password, done) =>{

        const user = await getUserByEmail(email)

        if(!user){
            
            return done(null, false)
        }
        try{

            if(await bcrypt.compare(password, user.password)){
                return done(null, user)

            } else{
                return done(null, false);

            }

        }catch(err) {
            return done(err)
        }
    }  
    passport.use(new LocalStrategy({usernameField: "email"}, authUser))
    passport.serializeUser((user, done) => {done(null, user._id )})
    // passport.deserializeUser(async (id, done) => {done(null, await getUserById(id))})
    // passport.deserializeUser((id, done) => {done(null, getUserById(id))})
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });

}

module.exports = init_passport;