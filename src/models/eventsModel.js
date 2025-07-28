const { Schema, mongoose } = require("mongoose");

const eventSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  titleBangla: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  eventDate: {
    type: Object,
  },
  registrationStartDate: {
    type: Object,
  },
  registrationEndDate: {
    type: Object,
  },
  location: {
    type: String,
  },
  createDate: {
    type: Object,
  },
  updateDate: {
    type: Object,
  },
});

module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);
