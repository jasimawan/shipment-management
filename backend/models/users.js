const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true, unique: true},
  type: {type: String, required: true},
  assignedShipments: [{
    _id: String,
    required: false
  }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
