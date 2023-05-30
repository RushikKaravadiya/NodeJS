const e = require("express");
const pool = require("../../db");
const queries = require('./queries');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getStudentsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) => {
        if (error){
            throw error;
        } 
        else if(results.rows.length ===0){
            res.send("Record does not exist");
        } 
        else{
            res.status(200).json(results.rows);
        }
    })
};

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    //check if query is exits
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email Is already exsists");
        }
        else {
            //add student
            pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
                if (error) throw error;
                res.status(201).send("Student Add Successfully");
            });
        }
    });
};

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student Does not Exsits");
        }
        else {
            pool.query(queries.removeStudent, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Student Removed Successfully");
            });
        }
    });
};

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, age, dob } = req.body;

    pool.query(queries.getStudentsById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        const noStudentFound = results.rows.length === 0;
        if (noStudentFound) {
            res.status(404).send("Student does not exist in the database");
        } else {
            pool.query(queries.updateStudent, [name, email, age, dob, id], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).send("Student updated successfully");
            });
        }
    });
};


module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
    removeStudent,
    updateStudent,
};
