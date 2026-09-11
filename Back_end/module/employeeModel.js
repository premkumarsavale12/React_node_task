
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,

    },

    dob: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"],

    },

    profilePicture: {
        type: String,
        default: null,
    },

    address: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    jobTitle:
    {
        type: String,
        required: true
    },
    companyName: {

        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },

    skills: {
        type: [String],
        required: true
    },
    expectedSalary: {
        type: String,
        required: true
    },
    website: {

        type: String,
        required: true
    },
    linkedin: {

        type: String,
        required: true
    },
    preferredContact: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },

    termsAccepted:
    {
        type: Boolean,
        required: true,
    },

})

const employee = mongoose.model('employee', employeeSchema);

export default employee;