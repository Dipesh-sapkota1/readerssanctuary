import User from "../models/User.js";
import { hashPassword } from '../utils/hashUtils.js'; 



export const getLogin = (req, res) => {res.render("users/login",{title:'Login'})};
export const getSignup = (req, res) => {res.render("users/signup",{title:'Sign Up'})};

export const addNewUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Validate input fields
        if (!email || !username || !password) {
            req.flash('error', 'All fields are required.');
            return res.redirect('/auth/register');
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            req.flash('error', 'A user with this email already exists.');
            return res.redirect('/auth/register');
        }

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            passwordHash: hashedPassword,
        });

        req.flash('success', 'Account created successfully! Please log in.');
        res.redirect('/auth/login');
        console.log('New user created:', newUser);
    } catch (error) {
        console.error('Error adding new user:', error);
        req.flash('error', 'An error occurred while creating the account. Please try again.');
        res.redirect('/auth/register');
    }
};


export const getHomePage = (req, res) => {
    if (req.isAuthenticated()) {
        res.render("home",{title:"User Home"});
    } else {
        res.redirect("/auth/login");
    }
};