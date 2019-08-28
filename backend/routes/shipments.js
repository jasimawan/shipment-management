const express = require('express');

const Shipment = require('../models/shipments');
const User = require('../models/users');
const mongoose = require('mongoose');

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

router.put("", (req,res,next) => {
  console.log(req.body.userName);
  Shipment.find({assignedTo: req.body.userName})
    .then(documents => {
      res.status(200).json({
        message: 'Shipments fetched successfully!',
        shipments: documents
      })
    });
});

  router.put("/:id", (req, res, next) => {
    User.findOne({name: req.body.assignedTo})
      .then(user => {
        if (user) {
          User.updateOne({name: req.body.assignedTo},
            {$push: {assignedShipments: req.body.id}})
            .then(() => {
              Shipment.updateOne({_id: req.params.id},
                {$push: {assignedTo: req.body.assignedTo}})
                .then(response => {
                  res.status(200).json({message: 'Shipment assigned Successfully!'});
                });
            })
        }
      })
  });

  router.get("/:id", (req, res, next) => {
    Shipment.findById(req.params.id).then(shipment => {
      if (Shipment) {
        res.status(200).json({
          message: 'Assigned Workers found!',
          assignedTo: shipment.assignedTo
        });
      } else {
        res.status(400).json({message: 'Workers not found'});
      }
    })
  });

  router.get("", (req, res, next) => {
    Shipment.find()
      .then(documents => {
        res.status(200).json({
          message: 'Shipments fetched successfully!',
          shipments: documents
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Shipment.deleteOne({_id: req.params.id})
      .then(result => {
        console.log(result);
        res.status(200).json({message: "Shipment Deleted!"});
      });
  });
module.exports = router;
