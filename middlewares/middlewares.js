// middleware.js
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import SequelizeStoreInit from 'connect-session-sequelize';
import sequelize from '../config/database.js';
import { setupPassportStrategy } from '../services/auth.service.js';
import passport from 'passport';
import flash from 'connect-flash';

const SequelizeStore = SequelizeStoreInit(session.Store);

const setMiddlewares = (app) => {

  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set('view engine', 'ejs');
  app.use(express.static('public'));
  // Initialize session store
const sessionStore = new SequelizeStore({
  db: sequelize,
});
  app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    store: sessionStore,
    resave: false, 
    saveUninitialized: false, 
    cookie: {
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  }));

  //Sync session store
  sessionStore.sync();

  // Setup Passport
  setupPassportStrategy();
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());
  app.use((req, res, next) => {
    res.locals.messages = req.flash();  
    next();
  });
  
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
  });
};

export default setMiddlewares;
