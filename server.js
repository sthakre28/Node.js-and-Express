const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();

const app = express();

const port = process.env.PORT || 5000;

// middleware
// this provides parser to parse the data stream
app.use(express.json());

app.use("/api/contacts", require("./route/contactRoute"));

// using middleware
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`);
})
