const Students = require('../model/studentModel');

const getAllStudents = async () => {
  const allStudents = await Students.findAll();
  return allStudents;
};

const getStudentByEmail = async (email_address)=>{
    const emailAvailable = await Students.findOne({
        where: { email_address: email_address },
    });
    return emailAvailable;
};

const signupStudents = async(first_name,last_name,email_address,hashedPassword)=>{
    await Students.create({
        first_name: first_name,
        last_name: last_name,
        email_address: email_address,
        password: hashedPassword
    });
};

const getStudentProfileByEmail = async(email_address)=>{
    const studentProfile = await Students.findOne({
        attributes: ['first_name', 'last_name', 'email_address'],
        where: { email_address: email_address },
    });
    return studentProfile;
};

module.exports = {
  getAllStudents,
  signupStudents,
  getStudentByEmail,
  getStudentProfileByEmail,
};
