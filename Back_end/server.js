import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import ConnectDb from './config/db.js'
import employee from "./route/employee.js";
import medicine from "./route/medicine.js";
import swaggerSpec from './swagger.js';
const app = express();

app.use(express.json());
app.use(cors());

ConnectDb();

app.use('/api/employee', employee);

app.use('/api/medicine', medicine);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
    res.json(swaggerSpec);
});
app.get("", (req, res) => {
    res.send("Server is Running.....");
})

app.listen(5000, () => {
    console.log("Server running 5000 port number......");
})