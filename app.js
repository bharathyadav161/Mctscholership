const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv=require('dotenv');
dotenv.config()

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser);
app.use(
  session({
    secret: "tcet",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set secure to true if using HTTPS
  })
);
async function connectToMongoDB() {
try {
  // Replace this with your actual MongoDB connection string
  const db = process.env.mongouri
  
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('Connected to MongoDB');
  port=process.env.port||5000
  app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});


  // Continue with your application logic here
  
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}
}
connectToMongoDB();



app.use(express.json());
app.use(cors());
// User
const User = require("./model/userSchemaa");
app.use(require("./router/auth.js"));
// Admin
const Admin = require("./model/adminSchema.js");
app.use(require("./router/adminAuth.js"));
// Scholarship
const Scholarships = require("./model/scholarshipModel.js");
app.use(require("./router/scholarshipAuth.js"));
// Application
const Applications = require("./model/applicationSchema.js");
app.use(require("./router/applicationsAuth.js"));

// Middleware
const middleware = (req, res, next) => {
  console.log("hello middleware");
  next();
};

const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
    console.log("Login require");
  } else {
    next();
  }
};



// middleware();


