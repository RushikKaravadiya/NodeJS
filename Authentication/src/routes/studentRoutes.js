const { Router } = require('express');
const controller = require("../controller/studentController");

const router  = new Router();

router.get("/students",controller.getStudents);
router.post("/signup",controller.SignUp);
router.post("/login",controller.Login);
router.get("/profile",controller.authenticateToken,controller.StudentProfile);

module.exports = router;