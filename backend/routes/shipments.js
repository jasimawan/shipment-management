const express = require('express');

const Shipment = require('../models/shipments');
const User = require('../models/users');

const router = express.Router();

router.post("", (req,res,next) => {
  const shipment = new Shipment({
    title: req.body.title,
    content: req.body.content,
    assignedTo: []
  });
  shipment.save()
    .then(createdShipment => {
      res.status(201).json({
        message: 'Shipment Added successfully',
        shipmentId: createdShipment._id
      });
    });
});


router.put("", (req,res,next) => {
  console.log(req.params.id);
  console.log(req.params.assignedTo);
  User.findOne({name: req.params.assignedTo} )
    .then(user => {
      if(user) {
        User.update({name: req.params.assignedTo},
            {$push: {assignedShipments: {_id: req.params.id}}})
          .then(response => {
            res.status(200).json(response);
          });
        Shipment.update({_id: req.params.id},
            {$push: {assignedTo: {name: req.params.assignedTo}}})
          .then(response => {
            res.status(200).json(response);
          })
      }
    })
});

router.get("/:id", (req,res,next) => {
  Shipment.findById(req.params.id).then(shipment => {
    if(Shipment) {
      res.status(200).json(shipment);
    }else{
      res.status(400).json({message:'Shipment not found'});
    }
  })
});

router.get("",(req, res, next) => {
  Shipment.find()
    .then(documents => {
      res.status(200).json({
        message: 'Shipments fetched successfully!',
        shipments: documents
      });
    });
});

router.delete("/:id", (req,res,next) => {
  Shipment.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Shipment Deleted!"});
    });
});

module.exports = router;
