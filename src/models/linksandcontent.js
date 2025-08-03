const { Schema, mongoose } = require("mongoose");

const organizationInfoSchema = new Schema({
  history: {
    type: String,
  },
  formation: {
    type: String,
  },
  establishment: {
    type: String,
  },
  vision: {
    type: String,
  },
  mission: {
    type: String,
  },
  achievements: {
    type: String,
  },
  secretaryMessage: {
    name: { type: String },
    designation: { type: String },
    message: { type: String },
    image: {
      public_id: String,
      url: String,
    },
  },
  presidentMessage: {
    name: { type: String },
    designation: { type: String },
    message: { type: String },
    image: {
      public_id: String,
      url: String,
    },
  },
  patronMessage: {
    name: { type: String },
    designation: { type: String },
    message: { type: String },
    image: {
      public_id: String,
      url: String,
    },
  },
  address: {
    type: String,
  },
  phonePresident: {
    type: String,
  },
  phoneSecretary: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  socialLinks: {
    facebook: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
      default: "",
    },
    whatsapp: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
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
