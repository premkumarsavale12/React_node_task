import mongoose from "mongoose";

const addmedicineSchema = new mongoose.Schema({

    MedicineName: {
        type: String,
        required: true,
        trim: true
    },

    GenericName: {
        type: String,
        required: true,
        trim: true
    },

    MedicineType: {
        type: String,
        required: true,
        enum: ["Syrp", "Tablet", "Injection"],

    },

    ManufacturerName: {
        type: String,
        required: true,
        trim: true
    },

    BatchNumber: {
        type: Number,
        required: true
    },
    ExpiryDate: {
        type: Date,
        required: true
    },
    MRP: {
        type: Number,
        required: true
    },
    SellingPrice: {
        type: Number,
        required: true
    },
    StockQuantity: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    }


})
const medicine = mongoose.model('addmedicine', addmedicineSchema);

export default medicine;
