// routes/userRoutes.js
import express from 'express';
import { getAccount, getProfile,addProfileInfo, myProfile, change} from '../controllers/user.controller.js';
const router = express.Router();


router.get('/accountSettings',getAccount);
router.get('/profileSettings',getProfile);
router.get('/myprofile',myProfile);
router.post('/profileInfo',addProfileInfo);
router.post('/change',change);


 
 
export default router;
