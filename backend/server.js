require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// define express app
const app = express();

// middleware
app.use(express.json());

// log all received requests to the console for debugging purposes
app.use ((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

// routes
app.use('/api/workouts/', workoutRoutes);
app.use('/api/user/', userRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening on port ${process.env.PORT}`);
    })
  })
  .catch((error) => {
    console.log(error)
  });