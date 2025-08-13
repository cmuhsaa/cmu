const { Schema, mongoose } = require("mongoose");
const validator = require("validator");

const studentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter Your name."],
    trim: true,
    minlength: [3, "Name must be atleast 3 charecter."],
    maxlength: [50, "Name allowed max 50 charecter."],
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, "Please Enter a valid Email"],
    required: false,
    default: "",
  },
  phone: {
    type: String,
    trim: true,
    unique: true,
  },
  batch: {
    type: Schema.Types.ObjectId,
    required: [true, "Please enter batch."],
    ref: "Batch",
  },
  about: String,
  profession: String,
  address: String,
  type: {
    type: String,
    default: "student",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createDate: {
    type: Object,
  },
  updateDate: {
    type: Object,
  },
});

module.exports =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
