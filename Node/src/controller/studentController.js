const e = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentServices = require("../services/studentServices");
const revokedTokens = new Set();

//Api for get all students
const getStudents = async (req, res) => {
  const grtAllStudents = await studentServices.getAllStudents();
  res.status(200).json(grtAllStudents);
};

//Api for registration
const SignUp = async (req, res) => {
  const { first_name, last_name, email_address, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  //required filed validation
  if (!first_name || !last_name || !email_address || !password) {
    return res.status(400).json({ error: "firstname,lastname,email and password is required" });
  }

  // check email is Available
  const emailAvailable = await studentServices.getStudentByEmail(email_address);
  if (emailAvailable) {
    res.status(409).json({ error: "Email address already registered" });
  } else {
    // Add new Students
    await studentServices.signupStudents(
      first_name,
      last_name,
      email_address,
      hashedPassword
    );
    res.status(201).json({ success: "Student added successfully" });
  }
};

// API for Student login
const Login = async (req, res) => {
  const { email_address, password } = req.body;

  // Check if the email is available
  const studentExists = await studentServices.getStudentByEmail(email_address);
  if (!studentExists) {
    res.status(404).json({ error: "Invalid Email address or email is empty" });
    return;
  }

  // Check if the password is valid
  const isValidPassword = await bcrypt.compare(
    password,
    studentExists.password
  );
  if (!isValidPassword) {
    res.status(404).json({ error: "Password does not match or password is empty" });
  } else {
    // Generate Authentication token
    const token = jwt.sign({ email_address }, "your_secret_key");
    res.send({ token });
  }
};

// Verify token and check revocation
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  if (revokedTokens.has(token)) {
    return res.status(401).json({ error: "Token has expired or is invalid" });
  }

  jwt.verify(token, "your_secret_key", (err, student) => {
    if (err) {
      return res.status(400).json({ error: "Invalid token" });
    }

    req.student = student;
    // Add the token to the revokedTokens set
    revokedTokens.add(token);
    next();
  });
}
// API for student profile
const StudentProfile = async (req, res) => {
  const email_address = req.student.email_address;

  // Get profile by email
  const studentProfile = await studentServices.getStudentProfileByEmail(
    email_address
  );

  if (!studentProfile) {
    res.status(404).json("Student profile not found");
  } else {
    res.json({ profile: studentProfile });
  }
};

module.exports = {
  getStudents,
  SignUp,
  Login,
  StudentProfile,
  authenticateToken,
};