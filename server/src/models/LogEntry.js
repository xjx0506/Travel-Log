const mongoose = require('mongoose')
const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};
const requiredNumber = {
  type: Number,
  required: true,
};
const defaultDate = {
  type: Date,
  default: Date.now,
  required: true,
};

const logEntrySchema = new Schema(
  {
    title: requiredString,
    description: String,
    comments: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    image: String,
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max: 180,
    },
    visitDate: {
      required: true,
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const logEntry = mongoose.model("logEntry", logEntrySchema);
module.exports = logEntry;
