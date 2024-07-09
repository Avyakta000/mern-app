const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
// const passport = require('./config/passport');

connectDB()
// Initialize Express app
const app = express();

// Session setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
  res.send(`Hello, ${req.user ? req.user.displayName : 'Guest'}`);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
