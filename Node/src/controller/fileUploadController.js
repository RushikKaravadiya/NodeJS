const multer = require('multer');
const model = require('../model/fileModel');
const fileServices = require('../services/fileServices');

//Only file Upload
const selectSinglefile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "src/images")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
},
).single("student_file")

const singleFileUpload = async (req, res) => {
    await selectSinglefile(req, res, async function (err) {
        if (err) {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                res.send("Only one file can be selected");
            } else {
                throw err;
            }
        }
        else {
            if (!req.file) {
                res.send("No file selected!");
            }
            else {
                const filename = req.file.filename;
                // const findRecord = await model.findOne({
                //     where: { path: singleFile }
                // });
                const findRecord = await fileServices.findFileByName(filename);
                if (findRecord) {
                    res.send("This file is already uploaded!");
                }
                else {
                    // await model.create({
                    //     path: singleFile
                    // });
                    await fileServices.createFile(filename);
                    res.send("Single file uploaded and data created successfully!");
                }
            }
        }
    });
};

//Multiple file upload
const selectMultipleFile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "src/images")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
}).array("student_file")

const multipleFileUpload = async (req, res) => {
    await selectMultipleFile(req, res, async function (err) {
        if (err) {
            throw err;
        }
        else {
            if (!req.files || req.files.length === 0) {
                res.send("No files selected!!!");
            }
            else {
                const filenames = req.files.map(file => file.filename);
                for (const filename of filenames) {
                    // const findRecord = await model.findOne({
                    //     where: { path: filename }
                    // });
                    const findRecord = await fileServices.findFileByName(filename);
                    if (!findRecord) {
                        // res.send("One or more files are already uploaded!!!");
                        // return;
                        // await model.create({
                        //     path: filename
                        // });
                        await fileServices.createFile(filename);
                    }
                }
                res.send("Multiple files uploaded and data created successfully!");
            }
        }
    });
};


module.exports = {
    singleFileUpload,
    multipleFileUpload,
};