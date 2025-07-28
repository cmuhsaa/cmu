const { Schema, mongoose } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  youtubeLink: {
    type: String,
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

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);