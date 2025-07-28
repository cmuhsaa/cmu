const { Schema, mongoose } = require("mongoose");
const validator = require("validator");

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter Your name."],
    trim: true,
    minlength: [3, "Admin Name must be atleast 3 charecter."],
    maxlength: [50, "Admin Name allowed max 50 charecter."],
  },
  email: {
    type: String,
    required: [true, "Please enter email."],
    trim: true,
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  phone: {
    type: String,
    required: [true, "Please enter phone."],
    trim: true,
    unique: true,
    minlength: [11, "Phone number must be atleast 11 charecter."],
  },
  batch: {
    type: Schema.Types.ObjectId,
    required: [true, "Please enter batch."],
    ref: "Batch",
  },
  message: String,
  createDate: {
    type: Object,
  },
  updateDate: {
    type: Object,
  },
});

module.exports = mongoose.models.FeedBack || mongoose.model('FeedBack', feedbackSchema);