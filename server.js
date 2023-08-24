const express = require("express");
const app = express();
require('dotenv').config()
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require('./routes/doctorRoute');

app.use(express.json())
app.use('/api/user', userRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/admin', adminRoute);
const port = process.env.PORT || 5000;

// console.log(process.env.MONGO_URL)
app.listen(port, () => console.log(`Node server started at port ${port}`))