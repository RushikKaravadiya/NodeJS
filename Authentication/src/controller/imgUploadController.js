const multer = require('multer');
const model = require('../model/imageModel')

const fileUpload = multer({
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
    await fileUpload(req, res, function (err) {
        if (err) {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                res.send("Only one file can be select");
            }
            else {
                throw err
            }
        }
        else {
            if (!req.file) {
                res.send("No file Selected");
            }
            else {
                //Entry in table
                model.create({
                    path: req.file.filename
                })
                res.send("Single file uploaded and data created successfully!");
            }
        }
    })
};

const multipleFileUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "src/images")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
}).array("student_file")

const multiImageUploads = async (req, res) => {
    await multipleFileUpload(req, res, function (err) {
        if (err) {
            throw err
        }
        else {
            //Entry in database       
            const filenames = req.files.map(file => file.filename);
            for (const filename of filenames) {
                const findRecord = model.findOne({
                    where: { path: filename }
                })
                if (!findRecord) {
                    model.create({
                        path: filename
                    });
                }
            }
            res.send("Multiple files uploaded and data created successfully!");
        }
    })
};

module.exports = {
    singleFileUpload,
    multiImageUploads,
};