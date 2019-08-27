const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shipmentsRoutes = require('./routes/shipments');
const userRoutes = require('./routes/users');


const app = express();

mongoose.connect("mongodb+srv://jasim:cnO1IhmAgISCZe1o@cluster0-mpdvd.mongodb.net/shipment-management?retryWrites=true&w=majority", {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection Failed!');
  });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:false}));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/shipments", shipmentsRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
