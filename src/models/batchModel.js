const { Schema, mongoose } = require("mongoose");

const batchSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter Your name."],
    trim: true,
  },
  createDate: {
    type: Object,
  },
  updateDate: {
    type: Object,
  },
});

module.exports = mongoose.models.Batch || mongoose.model('Batch', batchSchema);