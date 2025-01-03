import {} from 'dotenv/config';
import Book from '../models/Book.js';
import axios from 'axios';

const URL = process.env.API_URI;
const COVER_URL = process.env.API_COVER;

export const searchBook = async (req, res) => {
  const handleBookSearch = async (isAuthenticated) => {
    try {
      const query = req.body.search;
      if (!query) {
        req.flash("error", "Search query cannot be empty.");
        return res.redirect("/home");
      }

      const search = await axios.get(`${URL}/search.json?q=${query}`);
      if (!search.data.docs.length) {
        req.flash("error", "No books found for the given query.");
        return res.redirect("/home");
      }

      const book_id = search.data.docs[0]?.isbn?.[0];
      const author = search.data.docs[0]?.author_name?.[0];
      const title = search.data.docs[0]?.title;
      const published = search.data.docs[0]?.publish_date?.[0];
      const bookCover = `${COVER_URL}/b/isbn/${book_id}-M.jpg`;

      const book = {
        title,
        author,
        published,
        bookCover,
      };

      res.render("index", {
        title: isAuthenticated ? "User Home" : "Home",
        book,
        Auth: isAuthenticated,
        img: isAuthenticated ? req.user.user_img : null,
        username: isAuthenticated ? req.user.username : null,
      });
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while searching for the book. Please try again.");
      res.redirect("/home");
    }
  };

  if (req.isAuthenticated()) {
    await handleBookSearch(true);
  } else {
    await handleBookSearch(false);
  }
};

export const addBook = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const { title, bookCover, author, publishedDate } = req.body;
      const userId = req.user.id;
      await Book.create({
        title,
        bookCover,
        author,
        publishedDate,
        userId,
      });
      req.flash("success", `Book "${title}" added successfully.`);
      res.redirect("/home");
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while adding the book. Please try again.");
      res.redirect("/home");
    }
  } else {
    req.flash("error", "You need to be logged in to add a book.");
    res.redirect("/auth/login");
  }
};

export const details = async (req, res) => {
  if (req.isAuthenticated()) {
    const bookId = req.params.id;
    try {
      const book = await Book.findOne({ where: { id: bookId } });
      if (book) {
        res.render("books/details", {
          title: "Details",
          book,
          img: req.user.user_img,
          username: req.user.username,
        });
      } else {
        req.flash("error", "Book not found.");
        res.redirect("/books/booklist");
      }
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while fetching book details.");
      res.redirect("/books/booklist");
    }
  } else {
    req.flash("error", "You need to be logged in to view book details.");
    res.redirect("/auth/login");
  }
};

export const mybooklist = async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
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
      const books = await Book.findAll({ where: { userId }, order });
      res.render("books/booklist", {
        title: "My Booklist",
        books,
        img: req.user.user_img,
        username: req.user.username,
      });
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while fetching your booklist.");
      res.redirect("/home");
    }
  } else {
    req.flash("error", "You need to be logged in to view your booklist.");
    res.redirect("/auth/login");
  }
};

export const edit = async (req, res) => {
  if (req.isAuthenticated()) {
    const bookId = req.params.id;
    try {
      const book = await Book.findOne({ where: { id: bookId } });
      if (book) {
        res.render("books/edit", {
          title: "Edit",
          book,
          img: req.user.user_img,
          username: req.user.username,
        });
      } else {
        req.flash("error", "Book not found.");
        res.redirect("/books/booklist");
      }
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while fetching book details for editing.");
      res.redirect("/books/booklist");
    }
  } else {
    req.flash("error", "You need to be logged in to edit a book.");
    res.redirect("/auth/login");
  }
};

export const update = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const { review, rating, id, notes } = req.body;
      const [updatedRowCount] = await Book.update(
        { review, rating, notes },
        { where: { id } }
      );
      if (updatedRowCount) {
        req.flash("success", "Book updated successfully.");
      } else {
        req.flash("error", "Book not found or no changes made.");
      }
      res.redirect("/books/booklist");
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while updating the book.");
      res.redirect("/books/booklist");
    }
  } else {
    req.flash("error", "You need to be logged in to update a book.");
    res.redirect("/auth/login");
  }
};

export const remove = async (req, res) => {
  if (req.isAuthenticated()) {
    const bookId = req.params.id;
    try {
      const result = await Book.destroy({ where: { id: bookId } });
      if (result) {
        req.flash("success", "Book deleted successfully.");
      } else {
        req.flash("error", "Book not found.");
      }
      res.redirect("/books/booklist");
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while deleting the book.");
      res.redirect("/books/booklist");
    }
  } else {
    req.flash("error", "You need to be logged in to delete a book.");
    res.redirect("/auth/login");
  }
};
