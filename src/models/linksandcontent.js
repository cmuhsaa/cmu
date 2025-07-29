const { Schema, mongoose } = require("mongoose");

const organizationInfoSchema = new Schema({
  background: {
    type: String,
    required: [true, "Please enter background information."],
    trim: true,
  },
  introduction: {
    type: String,
    required: [true, "Please enter introduction."],
    trim: true,
  },
  messageFromChiefPatron: {
    type: String,
    required: [true, "Please enter message from Chief Patron."],
    trim: true,
  },
  messageFromPresident: {
    type: String,
    required: [true, "Please enter message from President."],
    trim: true,
  },
  messageFromSecretary: {
    type: String,
    required: [true, "Please enter message from General Secretary."],
    trim: true,
  },
  objectives: {
    type: String,
    required: [true, "Please enter objectives."],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please enter address."],
    trim: true,
  },
  phonePresident: {
    type: String,
    required: [true, "Please enter president phone number."],
    trim: true,
  },
  phoneSecretary: {
    type: String,
    required: [true, "Please enter secretary phone number."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email."],
    trim: true,
  },
  socialLinks: {
    facebook: {
      type: String,
      trim: true,
      default: "",
    },
    youtube: {
      type: String,
      trim: true,
      default: "",
    },
    whatsapp: {
      type: String,
      trim: true,
      default: "",
    },
    twitter: {
      type: String,
      trim: true,
      default: "",
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
  mongoose.models.OrganizationInfo ||
  mongoose.model("OrganizationInfo", organizationInfoSchema);
