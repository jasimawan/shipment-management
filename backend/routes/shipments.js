const express = require('express');

const Shipment = require('../models/shipments');
const User = require('../models/users');
const mongoose = require('mongoose');

const router = express.Router();

router.post("", (req,res,next) => {
  const shipment = new Shipment({
    title: req.body.title,
    content: req.body.content,
    status: 'Not Shipped Yet'
  });
  shipment.save()
    .then(createdShipment => {
      res.status(201).json({
        message: 'Shipment Added successfully',
        shipmentId: createdShipment._id
      });
    });
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


router.put("", (req,res,next) => {
  console.log(req.body.userName);
  Shipment.find({assignedTo: req.body.userName})
    .then(documents => {
      res.status(200).json({
        message: 'Workers assigned shipments fetched successfully!',
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
              Shipment.updateOne({$and: [{_id: req.params.id }, {assignedTo: {$ne: req.body.assignedTo}}]},
                {$push: {assignedTo: req.body.assignedTo}})
                .then(response => {
                  if(response.nModified > 0){
                  res.status(200).json({message: 'Shipment assigned Successfully!'});
                  }else{
                    res.status(200).json({message: 'Shipment already assigned to this User!'});
                  }
                })
            })
        }
      })
  });

  router.get("/:id", (req, res, next) => {
    Shipment.findById(req.params.id).then(shipment => {
      if (shipment) {
        res.status(200).json({
          message: 'Assigned Workers found!',
          assignedTo: shipment.assignedTo
        });
      } else {
        res.status(400).json({message: 'Workers not found'});
      }
    })
  });


router.get("/update/:id", (req,res,next) => {
  console.log(req.params.id);
  const randomNumber =  Math.floor(Math.random() * Math.floor(60));
  //res.status(200).json({message: randomNumber});
  setTimeout(() => {
    Shipment.findById(req.params.id).then(shipment => {
      if(shipment){
        if(shipment.status === 'Not Shipped Yet'){
          Shipment.updateOne({_id: req.params.id}, {
            status: 'Shipped'
          }).then(response => {
            res.status(200).json({message: "Status Updated Successfully", response});
          });
        }
        if(shipment.status === 'Shipped'){
          Shipment.updateOne({_id: req.params.id}, {
            status: 'Received by Client'
          }).then(response => {
            res.status(200).json({message: "Status Updated Successfully", response});
          });
        }
      }
    })
  }, randomNumber * 1000);
});


router.delete("/:id", (req, res, next) => {
    Shipment.deleteOne({_id: req.params.id})
      .then(result => {
        console.log(result);
        res.status(200).json({message: "Shipment Deleted!"});
      }).catch(err => {
      return res.status(401).json({
        message: 'Auth Failed'
      });
    });
  });


module.exports = router;
