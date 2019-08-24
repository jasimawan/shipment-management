const mongoose = require('mongoose');

const shipmentSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  status: {type: String, required: false},
  assignedTo: {type: String, required: false}
});

module.exports = mongoose.model('Shipment', shipmentSchema);
