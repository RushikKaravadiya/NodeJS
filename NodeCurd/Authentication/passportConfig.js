// const LocalStrategy = require("passport-local").Strategy;
// const { Pool } = require("pg");
// const bcrypt = require("bcrypt");
// const { authenticate } = require("passport");
// const pool = require("./db");

// function initialize(passport){

//     const authenticateUser = (email,passport,done)=>{
//         pool.query(`SELECT * FROM users WHERE email $1`,
//         [email],
//         )
//     }

//     passport.use(
//         new LocalStrategy({
//             usernameField:"email",
//             passwordField:"password"
//         },
//         authenticateUser
//         )
//     );
// }