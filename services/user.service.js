const mongoose=require('mongoose');
const User=require('../models/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const tokenService=require('../jwt/token.service');

class UserService{
    async userSignup({name,email,password}){
      const salt=10;
      const hashedPassword=await bcrypt.hash(password,salt);
      const savedUser=await User.create({name,email,password:hashedPassword});
      
      return savedUser;
    
    }
    async userLogin({email,password}){
      const user = await User.findOne({email}).select('+password');

      if (!user) {
        throw new Error('Invalid Credentials');
      }

      const isMatch= await bcrypt.compare(password,user.password);
      if(!isMatch){
        throw new Error('Invalid Credentials : Password wrong');
      }
      const payload={
        id: user.id,
        email:user.email,
        isActive:user.isActive,
      };
      const token=tokenService.generateToken(payload);
      const userWithoutPassword=user.toObject();
      delete userWithoutPassword.password;
      return {user: userWithoutPassword,token};
    }
    // async userLogin({email,password}){
    //   const token=jwt.sign({email:email,password:password},
    //     process.env.JWT_SECRET,{expiresIn:"1h"}
    //   );
    //   console.log(token);
      
    //   //const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcmloYXJhbjFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJBZG1pbjM0IiwiaWF0IjoxNzkyMDM2Nzg4LCJleHAiOjE3OTIwNDAzODh9.WmNvw0PQYYvLz-PWtJQCZFVt5C84zD__JRpT3VbAMcs";
    //   try{
    //   const decoded=jwt.verify(token,process.env.JWT_SECRET);
    //   console.log(decoded.email);
    //   console.log(decoded.password);
      
    //   }catch(err){
    //     console.log("JWT Error:",err.message);
    //   }
    //   return token;
    // }
    async getAllUsers(){
        const result = await User.find({isActive:true}).select('+password');
        return result;
    }

    async getUserById(id){
        if(!mongoose.isValidObjectId(id)){
            return null;
        }
        return await User.findById(id);
    }

    async createUser({name,email,password}){
        return await User.create({name,email,password});
    }
    async updateUser(id,{name,email}){
        if(!mongoose.isValidObjectId(id)){
            return null;
        }
        return await User.findByIdAndUpdate(id,{name,email},{returnDocument:'after',runValidators:true});
    }

  async patchUser(id, updates) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    return await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { returnDocument: 'after', runValidators: true }
    );
  }
  async deleteUser(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    return await User.findByIdAndDelete(id);
  }
  async softUser(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    return await User.findByIdAndUpdate(id,{isActive:false});
  }
}

module.exports=new UserService();