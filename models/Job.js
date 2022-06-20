const moongose = require('mongoose');

const JobSchema = new moongose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    maxlength: 50
  },
  position: {
    type: String,
    required: [true, 'Position name is required'],
    maxlength: 100
  },
  statue:{
    type: String,
    enum:['interview', 'declined', 'pending'],
    default: 'pending'
  },
  createdBy:{
    type: moongose.Types.ObjectId,
    ref:'User',
    required: [true, 'User is required']
  }
}, {timestamps: true})

module.exports = moongose.model('Job', JobSchema);