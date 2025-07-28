const { Schema, model } = require("mongoose")
const validator = require("validator")

const otpSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter email."],
        trim: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    otp: {
        type: Number,
        required: [true, "Please enter otp."],
    },
    role: {
        type: String,
        required: [true, "Please enter role."],
    },
    createDate: {
        type: Object,
    },
    expireDate: {
        type: Object,
    }
});


module.exports = mongoose.models.Otp || mongoose.model('Otp', otpSchema);