const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors()); //need to list this right after declaring express function in order for cors to work

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());
const todoListRoutes = require('./routes/todoList');

app.use('/api/todoList', todoListRoutes);
app.use('/api/users', require('./routes/users'));

const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests. only happens when we connect to the db (mongodb)
    app.listen(process.env.PORT, () => {
      console.log("Connecting to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error); //this will catch an error if it occurs (eg password is incorrect)
  });

