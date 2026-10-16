const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Name is required'],
            trim:true
        },
        email:{
            type:String,
            required:[true,'Email is required'],
            unique:true,
            lowercase:true,
            trim:true
        },
        rollNumber:{
            type:String,
            required:[true,'Roll number is required'],
            unique:true,
            trim:true
        },
        isActive:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
);

const Student=mongoose.model('Student',studentSchema);
module.exports=Student;
