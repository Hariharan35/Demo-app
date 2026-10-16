const express=require('express');
const router=express.Router();
const studentController=require('../controllers/student.controller');

// get all students & post new student
router.get('/',studentController.getAllStudents);
router.post('/',(req,res)=>studentController.createStudent(req,res));

// get, put, patch, delete student by id
router.get('/:id',(req,res)=>studentController.getStudentById(req,res));
router.put('/:id',(req,res)=>studentController.updateStudent(req,res));
router.patch('/softdelete/:id',(req,res)=>studentController.softDeleteStudent(req,res));
router.patch('/:id',(req,res)=>studentController.patchStudent(req,res));
router.delete('/:id',(req,res)=>studentController.deleteStudent(req,res));

module.exports=router;
