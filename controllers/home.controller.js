import Book from "../models/Book.js";
import User from "../models/User.js";

export const home = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.render("index", {
        title: "User Home",
        img: req.user.user_img,
        username: req.user.username,
        Auth: true,
        book: {},
        messages: req.flash(), // Pass flash messages to the view
      });
    } else {
      res.render("index", {
        title: "Home",
        Auth: false,
        book: {},
        messages: req.flash(), // Pass flash messages to the view
      });
    }
  } catch (error) {
    console.error("Error rendering home page:", error);
    req.flash("error", "An unexpected error occurred. Please try again.");
    res.redirect("/home"); // Redirect to the home route with an error message
  }
};


export const aboutPage = async (req, res) => {
  if (req.isAuthenticated()) {
    res.render("about", {
      title: "User About",
      Auth: true,
      img: req.user.user_img,
      username: req.user.username,
    });
  } else {
    res.render("about", { title: "About", Auth: false });
  }
};

export const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      req.flash("error", "Logout failed. Please try again.");
      return res.redirect("/home");
    }
    req.flash("success", "Logged out successfully.");
    res.redirect("/home");
  });
};

export const showPosts = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const users = await User.findAll({
        limit: 10,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Book,
            order: [["dateAdded", "DESC"]],
            limit: 1,
          },
        ],
      });

      res.render("posts", {
        users: users,
        title: "Posts",
        img: req.user.user_img,
        username: req.user.username,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      req.flash("error", "Failed to fetch posts. Please try again.");
      res.redirect("/home");
    }
  } else {
    req.flash("error", "Please log in to view posts.");
    res.redirect("/auth/login");
  }
};

export const publicProfile = async (req, res) => {
  if (req.isAuthenticated()) {
    const Userid = req.params.id;
    const orderByDate = req.query.date;
    const orderByRating = req.query.rating;

    let order = [];
    if (orderByDate) {
      order.push(["dateAdded", orderByDate]);
    }
    if (orderByRating) {
      order.push(["rating", orderByRating]);
    }

    try {
      const books = await Book.findAll({
        where: { userId: Userid },
        order: order,
      });
      const user = await User.findOne({ where: { id: Userid } });

      if (user && books) {
        res.render("public_profile", {
          title: user.username,
          user: user,
          books: books,
          img: req.user.user_img,
          username: req.user.username,
        });
      } else {
        req.flash("error", "User or books not found.");
        res.redirect("/home");
      }
    } catch (error) {
      console.error("Error fetching public profile:", error);
      req.flash("error", "An error occurred while fetching the public profile.");
      res.redirect("/home");
    }
  } else {
    req.flash("error", "Please log in to view public profiles.");
    res.redirect("/auth/login");
  }
};

