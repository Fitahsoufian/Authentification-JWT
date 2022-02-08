const express = require("express");
const res = require("express/lib/response");
const hotelModel = require("../models/Hotel");
const app = express();

const jwt = require('jsonwebtoken')
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.get("/hotels", async (request, response) => {
    const hotels = await hotelModel.find({});
    try {
      response.send(hotels);
    } catch (error) {
      response.status(500).send(error);
    }
  });

app.post("/hotels/create", async (request, response) => {
    const hotel = await hotelModel.create({
    name : request.body.name,
    description : request.body.description,
    // image_cover : request.body.image_cover,
    // images: request.body.images,
    stars : request.body.stars,
    status : request.body.status,
    // user_id : request.body.user_id
    });
    try {
      response.send(hotel);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  app.post("/hotels/update/:id", async (request, response) => {
    const hotels = await hotelModel.findOneAndUpdate({
        _id: request.params.id }, {name: request.body.name, description : request.body.description,image_cover : request.body.image_cover, images: request.body.images, stars : request.body.stars, status : request.body.status, user_id : request.body.user_id}, {returnDocument: 'after'
    });
    
  
    try {
      response.send(hotels);
    } catch (error) {
      response.status(500).send(error);
    }
  });

app.delete("/hotels/:id", async (request, response) => {
    try {
      const hotels = await hotelModel.findByIdAndDelete(request.params.id);
  
      if (!hotels) response.status(404).send("No item found");
      response.status(200).send();
    } catch (error) {
      response.status(500).send(error);
    }
  });
  module.exports = app;
  