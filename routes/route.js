var express = require('express');
var router = express.Router();

var teacher_controller = require('../controllers/teacher');
var student_controller = require('../controllers/student');

router.get('/getallteacherlist', teacher_controller.getallteacherlist);
router.post('/createnewteacher', teacher_controller.createnewteacher);
router.put('/updateteacherbyid/:id', teacher_controller.updateteacherbyid);
router.delete('/deleteteacherbyid/:id', teacher_controller.deleteteacherbyid);

router.get('/getallstudentlist', student_controller.getallstudentlist);
router.post('/createnewstudent', student_controller.createnewstudent);
router.put('/updatestudentbyid/:id', student_controller.updatestudentbyid);
router.delete('/deletestudentbyid/:id', student_controller.deletestudentbyid);
router.delete('/deletestudentdatabyteacherid/:id', student_controller.deletestudentdatabyteacherid);

module.exports = router;
