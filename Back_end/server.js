
import express from 'express';
import cors from 'cors';

import ConnectDb from './config/db.js'
import employee from "./route/employee.js";
import medicine from "./route/medicine.js";
 


const app = express();

app.use(express.json());
app.use(cors());

ConnectDb();

app.use('/api/employee', employee);

app.use('/api/medicine', medicine);
 

app.get("", (req, res) => {
    res.send("Server is Running.....");
})

app.listen(5000, () => {

    console.log("Server running 5000 port number......");

})