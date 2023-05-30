const express = require('express');
const app = express();
const  pool  = require("./db");
const bcrypt = require('bcrypt'); 
const session = require('express-session');
const flash = require('express-flash');

const PORT = process.env.PORT || 4000;
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:"secret",
    resave:flash,
    saveUninitializred:false
}));
app.use(express.json());
app.use(flash());



app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/users/login",(req,res)=>{
    res.render("login");
});

app.get("/users/register",(req,res)=>{
    res.render("register");
});
app.post("/users/register", async (req, res) => {
  let { firstname, lastname, email, password, confirmpassword } = req.body;
  let errors = [];

  if (!firstname || !lastname || !email || !password || !confirmpassword) {
    const errorMessage = "Please enter all fields";
    if (req.get("User-Agent").includes("Postman")) {
      return res.status(400).send(errorMessage);
    } else {
      errors.push({ message: errorMessage });
    }
  }

  if (password.length < 8) {
    const errorMessage = "Password should be at least 8 characters";
    if (req.get("User-Agent").includes("Postman")) {
      return res.status(400).send(errorMessage);
    } else {
      errors.push({ message: errorMessage });
    }
  }

  if (password !== confirmpassword) {
    const errorMessage = "Password and Confirm Password do not match!!!";
    if (req.get("User-Agent").includes("Postman")) {
      return res.status(400).send(errorMessage);
    } else {
      errors.push({ message: errorMessage });
    }
  }

  if (errors.length > 0) {
    if (req.get("User-Agent").includes("Postman")) {
      return res.status(400).send(errors);
    } else {
      return res.render("register", { errors });
    }
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows.length > 0) {
          errors.push({ message: "Email already registered!!!" });
          if (req.get("User-Agent").includes("Postman")) {
            return res.status(400).send(errors);
          } else {
            return res.render("register", { errors });
          }
        } else {
          pool.query(
            `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id, password`,
            [firstname, lastname, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              req.flash("success_msg", "You are now registered. Please log in");
              if (req.get("User-Agent").includes("Postman")) {
                return res.status(200).send("Register successfully");
              } else {
                return res.redirect("/users/login");
              }
            }
          );
        }
      }
    );
  }
});


app.get("/users/dashbord",(req,res)=>{
    res.render("dashbord",{user:"Rushik"});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} Plase Open In Browser`);
});