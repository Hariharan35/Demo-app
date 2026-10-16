const mongoose=require('mongoose');
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Name is required'],
            trim:true
        },
        email:{
            type:String,
            required:[true,'email is required'],
            unique:true,
            lowercase:true,
            trim:true
        },
        isActive:{
            type:Boolean,
            default:true
        },
        password:{
            type:String,
            required:[true,'Password is required'],
            select:false
        },
    },
    {
        timestamps:true
    }
);
const User=mongoose.model('User',userSchema);
module.exports=User;
