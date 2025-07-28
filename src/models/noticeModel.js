const { Schema, mongoose } = require("mongoose");

const noticeSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
  },
  dateTime: {
    type: Object,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createDate: {
    type: Object,
  },
  updateDate: {
    type: Object,
  },
});

module.exports = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);