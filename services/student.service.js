const mongoose=require('mongoose');
const Student=require('../models/student.model');

class StudentService{
    async getAllStudents(){
        return await Student.find({isActive:true});
    }

    async getStudentById(id){
        if(!mongoose.isValidObjectId(id)){
            return null;
        }
        return await Student.findById(id);
    }

    async createStudent({name,email,rollNumber}){
        return await Student.create({name,email,rollNumber});
    }

    async updateStudent(id,{name,email,rollNumber}){
        if(!mongoose.isValidObjectId(id)){
            return null;
        }
        return await Student.findByIdAndUpdate(
            id,
            {name,email,rollNumber},
            {returnDocument:'after',runValidators:true}
        );
    }

    async patchStudent(id,updates){
        if(!mongoose.isValidObjectId(id)){
            return null;
        }
        return await Student.findByIdAndUpdate(
            id,
            {$set:updates},
            {returnDocument:'after',runValidators:true}
        );
    }

    async deleteStudent(id){
        if(!mongoose.isValidObjectId(id)){
            return null;
        }
        return await Student.findByIdAndDelete(id);
    }

    async softDeleteStudent(id){
        if(!mongoose.isValidObjectId(id)){
            return null;
        }
        return await Student.findByIdAndUpdate(id,{isActive:false});
    }
}

module.exports=new StudentService();
