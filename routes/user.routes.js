const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller');
const authMiddleware=require('../middleware/auth.middleware');

//get alll usrs & post new user
//router.get('/',(req,res)=>userController.getAllUsers(req,res));
router.post('/',(req,res)=>userController.createUser(req,res));
router.get('/',authMiddleware,userController.getAllUsers);


router.post('/signup/',(req,res)=>userController.usersignup(req,res));
//This is login api
router.post('/login/',(req,res)=>userController.userLogin(req,res));

router.get('/getuserprofile', authMiddleware,userController.getUserProfile);
//get put patch delete usr by id

router.get('/:id', (req, res) => userController.getUserById(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.patch('/softdelete/:id', (req, res) => userController.softUser(req, res));
router.patch('/:id', (req, res) => userController.patchUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

module.exports=router;
