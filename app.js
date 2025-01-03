import {} from'dotenv/config';
import express from 'express';
import userRouter from './routes/user.routes.js';
import bookRouter from './routes/book.routes.js';
import authRouter from './routes/auth.routes.js';
import homeRouter from './routes/home.routes.js';
import sequelize from './config/database.js';
import setMiddlewares from './middlewares/middlewares.js';
const app = express();

setMiddlewares(app);

app.get('/',homeRouter);
app.use('/auth', authRouter);
app.use('/home',homeRouter);
app.use('/books', bookRouter);
app.use('/users', userRouter);

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    // Start the Express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

init();
