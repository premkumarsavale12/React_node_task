
import express from "express";
const router = express.Router();
import Medicine from "../module/addmedicine.js";

// for get all 

router.get("/all", async (req, res) => {
    try {

        const data = await Medicine.find();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ err: err.message });

    }
});

// for get id 

router.get("/:id", async (req, res) => {

    try {
        const data = await Medicine.findById(req.params.id);
        res.json(data);

    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
});

// for post method 
router.post("/add", async (req, res) => {
    try {
        const data = await Medicine.insertMany(req.body);

        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
});


// for put method 

router.put("/:id", async (req, res) => {

    try {

        const updatedFields = {

            MedicineName: req.body.MedicineName,
            GenericName: req.body.GenericName,
            MedicineType: req.body.MedicineType,
            ManufacturerName: req.body.ManufacturerName,
            BatchNumber: req.body.BatchNumber,
            ExpiryDate: req.body.ExpiryDate,
            MRP: req.body.MRP,
            SellingPrice: req.body.SellingPrice,
            StockQuantity: req.body.StockQuantity,
            Description: req.body.Description
        }

        const updateddata = await Medicine.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true }
        );

        if (!updateddata) return res.status(404).json({ message: "not found" });
        res.json(updateddata);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// for delere method 
router.delete("/:id", async (req, res) => {

    try {

        const deletedata = await Medicine.findByIdAndDelete(req.params.id);
        if (!deletedata) return res.status(404).json({ message: "Not Found Items...." });
        res.json("deleted SuccessFully.....");
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });

    }
})

export default router;