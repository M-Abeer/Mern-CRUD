const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bookRouter = require('./route/bookRoute');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
app.use(express.json());
app.use(morgan('dev'));

//CORS
app.use(cors());

//Database
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose.connect(DB, {}).then(() => console.log('DB connection successful!'));

app.use('/books', bookRouter);

app.use((next) => {
  console.log('Hello from the middleware 👋');
  next();
});
console.log(process.env.USER);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
