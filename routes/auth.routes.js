import express from 'express';
import { addNewUser,getHomePage } from '../controllers/auth.controller.js';
import { getLogin,getSignup } from '../controllers/auth.controller.js';
import passport from 'passport';
const router = express.Router();

router.get("/login",getLogin);
router.get("/signup",getSignup);
router.get("/home",getHomePage);

router.get("/google", 
    passport.authenticate("google", {
    scope: ["profile", "email"],
  }));

router.get("/google/callback",
    passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/login",
  }));

router.post("/registerUser",addNewUser);

router.post("/loginUser",
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login",
      })
);


export default router;