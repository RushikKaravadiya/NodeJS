const multer = require('multer');
const fileServices = require('../services/fileServices');

//Only single file Upload
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
    const { firstname, lastname, email } = req.body;
    if (err) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        res.status(401).json({ error: "Only one file can be selected" });
      } else {
        throw err;
      }
    }
    else {
      if (!req.file || !firstname || !lastname || !email) {
        res.status(401).json({ error: "All fields are required" });
        return;
      }

      const filename = req.file.filename;
      const existingUser = await fileServices.findUserByEmail(email);
      let user; // Declare the user variable

      if (!existingUser) {
        user = await fileServices.createUser(firstname, lastname, email);
        await fileServices.createFile(filename, user.id);
        res.status(200).json({ success: "Single file uploaded and data created successfully!" });
        return;
      }
      else {
        const findRecord = await fileServices.findFileByNameAndUserId(filename, existingUser.id);
        if (findRecord) {
          res.send("This file is already uploaded!");
        } else {
          await fileServices.createFile(filename, existingUser.id);
          res.status(200).json({ success: "Single file uploaded and data created successfully!" });
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
    const { firstname, lastname, email } = req.body;
    if (err) {
      throw err;
    } else {
      if (!req.files || req.files.length === 0 || !firstname || !lastname || !email) {
        res.status(401).json({ error: "All fields are required!!!" });
      } else {
        const filenames = req.files.map((file) => file.filename);
        const existingUser = await fileServices.findUserByEmail(email);

        if (!existingUser) {
          const user = await fileServices.createUser(firstname, lastname, email);
          for (const filename of filenames) {
            // Check if file is uploaded
            const findRecord = await fileServices.findFileByNameAndUserId(filename, user.id);
            if (!findRecord) {
              // Create new file
              await fileServices.createFile(filename, user.id);
            }
          }
          res.status(200).json({success:"Multiple files uploaded and user created in the database"});
        } else {
          for (const filename of filenames) {
            // Check if file is uploaded
            const findRecord = await fileServices.findFileByNameAndUserId(filename, existingUser.id);
            if (!findRecord) {
              // Create new file
              await fileServices.createFile(filename, existingUser.id);
            }
          }
          res.status(200).json({success:"Multiple files uploaded and data created successfully!"});
        }
      }
    }
  });
};



module.exports = {
  singleFileUpload,
  multipleFileUpload,
};
