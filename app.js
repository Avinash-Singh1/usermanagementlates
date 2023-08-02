require("dotenv").config();
const express = require("express");
const expressLayout= require("express-ejs-layouts")
const connectDB=require("./server/config/db")
const {flash} =require('express-flash-message');
const session =require('express-session');

const app= express();
const port =5000 || process.env.port

// connect to Database 
connectDB();

// this is kind of which helps to grap the data from form using 
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Static Files
app.use(express.static('public'));

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
  })
);

// Flash Messages
// app.use(flash({ sessionKeyName: 'flashMessage' }));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/customer'))

// Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, ()=> {
  console.log(`App listeing on port ${port}`)
});
