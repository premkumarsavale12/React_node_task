import express from "express";
const router = express.Router();
import Employee from "../module/employeeModel.js";

// for get all 

router.get("/all", async (req, res) => {

    try {
        const data = await Employee.find();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
});

//for get specific id 

router.get("/:id", async (req, res) => {
    try {
        const data = await Employee.findById(req.params.id);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
});
//for post method 

router.post("/add", async (req, res) => {

    try {
        const savedata = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            dob: req.body.dob,
            gender: req.body.gender,
            profilePicture: req.body.profilePicture,
            address: req.body.address,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            pincode: req.body.pincode,
            jobTitle: req.body.jobTitle,
            companyName: req.body.companyName,
            experience: req.body.experience,
            skills: req.body.skills,
            expectedSalary: req.body.expectedSalary,
            website: req.body.website,
            linkedin: req.body.linkedin,
            preferredContact: req.body.preferredContact,
            about: req.body.about,
            termsAccepted: req.body.termsAccepted
        })
        res.status(201).json(savedata);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

// for put method 

router.put("/:id", async (req, res) => {

    try {

        const updatedFields = {

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            dob: req.body.dob,
            gender: req.body.gender,
            profilePicture: req.body.profilePicture,
            address: req.body.address,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            pincode: req.body.pincode,
            jobTitle: req.body.jobTitle,
            companyName: req.body.companyName,
            experience: req.body.experience,
            skills: req.body.skills,
            expectedSalary: req.body.expectedSalary,
            website: req.body.website,
            linkedin: req.body.linkedin,
            preferredContact: req.body.preferredContact,
            about: req.body.about,
            termsAccepted: req.body.termsAccepted
        }

        const updateddata = await Employee.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true }
        );

        if (!updateddata) return res.status(404).json({ message: "Not Found" });
        res.json(updateddata)
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

// for delete method 

router.delete("/:id", async (req, res) => {
    try {
        const deletedata = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedata) return res.status(404).json({ message: "Not Found Items...." });
        res.json("Deleted SuccessFully....");
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

export default router;