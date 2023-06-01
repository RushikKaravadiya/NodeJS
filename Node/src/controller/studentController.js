const e = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const studentServices = require('../services/studentServices')

//Api for get all students
const getStudents = async (req, res) => {
    const grtAllStudents = await studentServices.getAllStudents();
    res.status(200).json(grtAllStudents);
};

//Api for registration
const SignUp = async (req, res) => {
    const { first_name, last_name, email_address, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    //required fild validaion
    if (!first_name || !last_name || !email_address || !password) {
       return res.status(401).send("firstname,lastname,email and password is required");
        
    }

    // check email is Available
    const emailAvailable = await studentServices.getStudentByEmail(email_address);
    if (emailAvailable) {
        res.send('Email address already registered');
    }
    else {
        // Add new Students
        await studentServices.signupStudents(first_name, last_name, email_address, hashedPassword);
        res.status(200).send("Student added successfully");
    }
};

//Api for Student login
const Login = async (req, res) => {
    const { email_address, password } = req.body;

    // Check if the email is available
    const studentsExist = await studentServices.getStudentByEmail(email_address);
    if (!studentsExist) {
        res.status(401).send("Invalid Email address or email is empty");
        return;
    }

    // Check if the password exists
    const isValidPassword = await bcrypt.compare(password, studentsExist.password);
    if (!isValidPassword) {
        res.status(401).send("Password does not match or password is empty");
    }
    else {
        // Generate Authentication token
        const token = jwt.sign({ email_address }, 'your_secret_key');
        res.send({ token });
    }
};

//verify token
function authenticateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("No token Provided");
    }
    jwt.verify(token, 'your_secret_key', (err, student) => {
        if (err) {
            return res.status(403).send("Invalid Token");
        } else {
            req.student = student;
            next(); //Allow to request to continue to the next middleware in line
        }
    });
};

//Api for  students profile 
const StudentProfile = async (req, res) => {
    const email_address = req.student.email_address;
    // Get profilebyEmail
    const studentProfile = await studentServices.getStudentProfileByEmail(email_address);

    if (!studentProfile) {
        res.status(401).send("Student profile not found");
    }
    else {
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