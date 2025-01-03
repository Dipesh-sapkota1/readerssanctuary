// routes/bookRoutes.js
import express from 'express';
import { searchBook, addBook, details, mybooklist, edit, update, remove } from '../controllers/book.controller.js';

const router = express.Router();


router.post('/search', searchBook);
router.post('/add', addBook);
router.get("/details/:id",details);
router.get("/booklist",mybooklist);
router.post("/edit/",update);
router.get("/edit/:id",edit);
router.delete("/delete/:id",remove);



export default router;
