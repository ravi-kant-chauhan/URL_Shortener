const express = require("express");
const {connectToMongoDB} = require("./connect");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
    console.log("MongoDb connected!");
})


app.use(express.json());



app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
