const File = require("../model/fileModel");
// const User = require("../model/fileModel");
const Sequelize  = require("sequelize");

const findFileByNameAndUserId   = async (filename,id) => {
    const findRecord = await File.Images.findOne({
        where: { path: filename ,
        UserId:id}
    });
    return findRecord;
}

const createFile = async (filename,id) => {
    await File.Images.create({
        path: filename,
        UserId:id
    });
}
const createUser = async (firstName, lastName, email) => {
    try {
        const user = await File.User.create({ firstName, lastName, email });
        return user;
    } 
    catch (error) {
        throw error;
    }
};
const findUserByEmail = async(email)=>{
    const findEmail = await File.User.findOne({
        where:{email : email}
    })
    return findEmail;
}

module.exports = {
    findFileByNameAndUserId,
    createFile,
    createUser,
    findUserByEmail,
};