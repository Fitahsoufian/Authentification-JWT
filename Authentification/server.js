const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter.js");
const hotelRouter = require('./routes/hotelRouter.js');
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://Soufian:SFTSFT99@cluster0.bcz99.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

app.use(userRouter);
app.use(hotelRouter);


app.listen(3300, () => {
  console.log("Server is running...");
});