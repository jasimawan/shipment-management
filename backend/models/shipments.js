const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const shipmentSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  status: {type: String, required: false},
  assignedTo: {type: Array, Default: [], required: false}
});

shipmentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Shipment', shipmentSchema);
