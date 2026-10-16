const studentService=require('../services/student.service');

class StudentController{

    async getAllStudents(req,res){
        try{
            const students=await studentService.getAllStudents();
            res.json(students);
        }catch(err){
            res.status(500).json({error:err.message});
        }
    }

    async getStudentById(req,res){
        try{
            const student=await studentService.getStudentById(req.params.id);
            if(!student){
                return res.status(404).json({message:'Student not found'});
            }
            res.json(student);
        }catch(err){
            res.status(500).json({error:err.message});
        }
    }

    async createStudent(req,res){
        try{
            const {name,email,rollNumber}=req.body;
            if(!name||!email||!rollNumber){
                return res.status(400).json({message:'"name", "email" and "rollNumber" are required'});
            }
            const newStudent=await studentService.createStudent({name,email,rollNumber});
            res.status(201).json(newStudent);
        }catch(err){
            if(err.code===11000){
                return res.status(409).json({message:'A student with this email or roll number already exists'});
            }
            res.status(400).json({error:err.message});
        }
    }

    async updateStudent(req,res){
        try{
            const {name,email,rollNumber}=req.body;
            if(!name||!email||!rollNumber){
                return res.status(400).json({message:'"name", "email" and "rollNumber" are required for full update (PUT)'});
            }
            const updatedStudent=await studentService.updateStudent(req.params.id,{name,email,rollNumber});
            if(!updatedStudent){
                return res.status(404).json({message:'Student not found'});
            }
            res.json(updatedStudent);
        }catch(err){
            if(err.code===11000){
                return res.status(409).json({message:'A student with this email or roll number already exists'});
            }
            res.status(400).json({error:err.message});
        }
    }

    async patchStudent(req,res){
        try{
            const updates={};
            if(req.body.name!==undefined) updates.name=req.body.name;
            if(req.body.email!==undefined) updates.email=req.body.email;
            if(req.body.rollNumber!==undefined) updates.rollNumber=req.body.rollNumber;

            if(Object.keys(updates).length===0){
                return res.status(400).json({message:'Provide at least one field to update'});
            }
            const updatedStudent=await studentService.patchStudent(req.params.id,updates);
            if(!updatedStudent){
                return res.status(404).json({message:'Student not found'});
            }
            res.json(updatedStudent);
        }catch(err){
            if(err.code===11000){
                return res.status(409).json({message:'A student with this email or roll number already exists'});
            }
            res.status(400).json({error:err.message});
        }
    }

    async softDeleteStudent(req,res){
        try{
            const student=await studentService.softDeleteStudent(req.params.id);
            if(!student){
                return res.status(404).json({message:'Student not found'});
            }
            res.json({message:'Student deactivated successfully'});
        }catch(err){
            res.status(500).json({error:err.message});
        }
    }

    async deleteStudent(req,res){
        try{
            const student=await studentService.deleteStudent(req.params.id);
            if(!student){
                return res.status(404).json({message:'Student not found'});
            }
            res.json({message:'Student deleted successfully'});
        }catch(err){
            res.status(500).json({error:err.message});
        }
    }
}

module.exports=new StudentController();
