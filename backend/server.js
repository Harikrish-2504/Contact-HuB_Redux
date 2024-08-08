const express = require("express");
const bodyparser = require("body-parser")
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/dbConnection");
const cors = require("cors")

const app = express();
const dotenv = require("dotenv").config();
dbConnection();


const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


//route setup

app.use("/contact",require("./routes/contactRoutes"));


app.use(errorHandler);

app.listen(port ,() => {

    console.log(`server is running on: http://localhost:${port}`);
}) 