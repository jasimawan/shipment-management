const express = require('express');

const Shipment = require('../models/shipments');

const router = express.Router();

router.post("", (req,res,next) => {
  const shipment = new Shipment({
    title: req.body.title,
    content: req.body.content
  });
  shipment.save()
    .then(createdShipment => {
      res.status(201).json({
        message: 'Shipment Added successfully',
        shipmentId: createdShipment._id
      });
    });
});

router.put("/:id", (req, res, nex) => {
  const shipment = new Shipment({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Shipment.updateOne({_id: req.params.id}, shipment).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update Successful'});
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
