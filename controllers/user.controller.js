import User from "../models/User.js";
import Book from "../models/Book.js";
import { hashPassword, checkHash } from "../utils/hashUtils.js";

export const getAccount = (req, res) => {
 if (req.isAuthenticated()) {
  res.render("users/settings/account.ejs",{
    title:"Account Settings",
    img:req.user.user_img,
    username:req.user.username
  });
 } else {
  res.redirect("/home");
 }
}
export const getProfile = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("users/settings/profile.ejs",{
      title:"Profile Settings",
      img:req.user.user_img,
      username:req.user.username,
    });
   } else {
    res.redirect("/home");
   }
}


export const addProfileInfo = async (req, res) => {
  try {
    const { username, user_img, bio, preferredGenre, favouriteBook } = req.body;
    const id = req.user.id;

    // Check if the user exists
    const user = await User.findOne({ where: { id } });

    if (user) {
      // Prepare an object to hold updated values
      const updatedFields = {};

      if (username) updatedFields.username = username;
      if (user_img) updatedFields.user_img = user_img;
      if (bio) updatedFields.bio = bio;
      if (preferredGenre) updatedFields.preferredGenre = preferredGenre;
      if (favouriteBook) updatedFields.favouriteBook = favouriteBook;

      // Update the user profile only with the provided fields
      if (Object.keys(updatedFields).length > 0) {
        await User.update(updatedFields, { where: { id } });

        req.flash("success", "Profile information updated successfully.");
      } else {
        req.flash("info", "No fields to update.");
      }

      res.redirect("/home/posts");
    } else {
      req.flash("error", "User not found.");
      res.redirect("/home/posts");
    }
  } catch (error) {
    console.error(error);
    req.flash("error", "An error occurred while updating profile information. Please try again.");
    res.redirect("/home/posts");
  }
};



export const myProfile = async(req, res) =>{
  if(req.isAuthenticated()){
    const Userid = req.user.id;
    const orderByDate = req.query.date;
    const orderByRating = req.query.rating;


    let order = [];
    if (orderByDate) {
      order.push(['dateAdded', orderByDate]);
    }
    if (orderByRating) {
      order.push(['rating', orderByRating]);
    }
    try {
      const user = await User.findOne({where:{id:Userid}});
      const books = await Book.findAll({
        where: { userId: Userid },
        order: order,
      });
      res.render("users/profile",{
        title:"My profile",
        img:req.user.user_img,
        username:req.user.username,
        user:user,
        books:books
      });
    } catch (error) {
      console.log(error);
    }
  }else{
    res.redirect("/auth/login");
  }

};

export const change = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await User.findOne({ where: { id: req.user.id } });

      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/users/accountSettings'); 
      }

      const hashedPassword = user.passwordHash;
      const result = checkHash(currentPassword, hashedPassword);

      if (!result) {
        req.flash('error_msg', 'Incorrect current password');
        return res.redirect('/users/accountSettings'); 
      }

      const passwordHash = await hashPassword(newPassword);

      if (!passwordHash) {
        req.flash('error_msg', 'Failed to generate hash for new password');
        return res.redirect('/users/accountSettings'); 
      }
      await User.update(
        { passwordHash },
        { where: { id: req.user.id } }
      );

      req.flash('success_msg', 'Password changed successfully');
      res.redirect('/users/accountSettings'); 
    } catch (error) {
      console.error('Error changing password:', error);
      req.flash('error_msg', 'An error occurred while changing the password');
      res.redirect('/users/accountSettings'); 
    }
  } else {
    req.flash('error_msg', 'You need to be logged in to change your password');
    res.redirect('/home'); 
  }
};
