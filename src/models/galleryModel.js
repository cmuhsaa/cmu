const { Schema, mongoose } = require("mongoose");

const gallerySchema = new Schema({
  title: {
    type: String,
    trim: true,
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
  youtubeLink: {
    type: String,
  },
  createDate: {
    type: Object,
  },
  updateDate: {
    type: Object,
  },
});


module.exports = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
