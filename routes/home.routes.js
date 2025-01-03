import express from 'express';
import { home, showPosts, logout, aboutPage, publicProfile } from '../controllers/home.controller.js';

const router = express.Router();

router.get('/',home);
router.get('/about',aboutPage);
router.get('/logout',logout);
router.get('/posts',showPosts);  
router.get('/public/:id',publicProfile);  


export default router;