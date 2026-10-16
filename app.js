const express=require("express");
require('dotenv').config();
const connectDB=require("./config/db");
const userRoutes=require('./routes/user.routes');
const studentRoutes=require('./routes/student.routes');


const app=express();
app.use(express.json())
app.use('/api/users',userRoutes)
app.use('/api/students',studentRoutes)


// app.listen(process.env.PORT,()=>{
//    console.log(`Server running on port ${process.env.PORT}`);
// })


connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);

    });

}).catch((err)=>{
    console.error('Failed to start server due to Database Connection error');
    process.exit(1);
})

