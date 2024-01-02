const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
app.use(express.json());
const Port = process.env.PORT;
const DB = process.env.DB;


app.get("/",(req,res)=>{
    res.send(DB);
})

app.listen(Port,()=>{
    console.log(`server running in port ${Port}`);
});




// const shortid = require("shortid");
// const database = {};


// app.post("/longurl",(req,res)=>{
//     const longurl = req.body.longurl;
//     const shorturl = shortid.generate();
//     database[shorturl] = longurl;
//     res.send(shorturl);
// });

// app.get("/:shorturl",(req,res)=>{
//     const shorturl = req.params.shorturl;
//     const longurl = database[shorturl];
//     res.send(longurl);
// });