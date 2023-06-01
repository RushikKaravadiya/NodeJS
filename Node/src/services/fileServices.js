const File = require("../model/fileModel");

const findFileByName = async (filename)=>{
    const findRecord = await File.findOne({
        where: { path: filename }
    });
    return findRecord;
}

const createFile = async (filename)=>{
    await File.create({
        path: filename
    });
}
module.exports = {
    findFileByName,
    createFile,
};