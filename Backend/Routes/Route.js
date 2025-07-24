import express from 'express';
import { AuthenticateUser, githubLogin, googleLogin, LoginUser, Logout, UserRegister } from '../Controller/userController.js';
const router=express.Router();
router.get('/verify',AuthenticateUser);
router.post('/register',UserRegister);
router.post('/login',LoginUser);
router.post('/logout',Logout);
router.post('/google-login',googleLogin);
router.post('/github-login',githubLogin);

export default router;
