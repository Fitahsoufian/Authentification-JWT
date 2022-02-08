const express = require("express");
const res = require("express/lib/response");
const userModel = require("../models/User");
const app = express();

const jwt = require('jsonwebtoken')
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.get("/users", async (request, response) => {
  const users = await userModel.find({});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.post("/users/create", async (request, response) => {
    const users = await userModel.create({
    name : request.body.name,
    email : request.body.email,
    password : request.body.password
    });
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.post("/users/update/:id", async (request, response) => {
    const users = await userModel.findOneAndUpdate({
        _id: request.params.id }, {
          name: request.body.name, email: request.body.email, password: request.body.password}, {returnDocument: 'after'
    });
    
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });


  app.post("/users/login", async (request, response) => {
   const user = await userModel.findOne({
    email : request.body.email,
    // password : request.body.password,

   })
   if (!user || user.password != request.body.password) {
      response.status(400).json({message:'not login'})
  }else{
    
      jwt.sign({user},process.env.TOKEN_SECRET,(err,token)=>{
           if (err) {
             response.json({message:'token invalid'})
           } else{

            response.send(token)
           }


    })
    
    // response.json({message:'is login'})
  }
 
    
  });

module.exports = app;