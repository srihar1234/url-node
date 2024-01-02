//IMPORTS
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const crypto = require("crypto");


//MIDDLEWARES AND INITIALIZATIONS
const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
const Port = process.env.PORT;
const URL = process.env.URL;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'myhari2002@gmail.com',
      pass: 'Hari#1234',
    },
  });


//API
app.post("/signup", async (req, res) => {
    try {
        const request = req.body;
        const hashedPassword = await bcrypt.hash(request.password,10);
        request.password = hashedPassword;

        const connection = await MongoClient.connect(URL);
        const db = connection.db("urlShortener");
        const user = await db.collection("users").insertOne(request);
        await connection.close();
        res.send("Sign-Up successfull");
    }
    catch (err) {
        res.send(err);
    }
});

app.post("/login",async(req,res)=>{
    try{
        const request = req.body;
        const connection = await MongoClient.connect(URL);
        const db = connection.db("urlShortener");
        const user = await db.collection("users").findOne({email:request.email});
        if(!user){
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(request.password,user.password);
        if(passwordMatch){
            res.status(200).send("success");
        }
        else{
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
    catch(err){
        res.send(err);
    }
});

app.post("/mailCheck",async(req,res)=>{
    try{
        const request = req.body;
        const connection = await MongoClient.connect(URL);
        const db = connection.db("urlShortener");
        const user = await db.collection("users").findOne({email:request.email});
        if(!user){
            res.status(401).json({error:"Invalid mail id"});
        }
        else{
            await connection.close();
            return res.send("success");
        }
    }
    catch(err){
        res.status(401).send(err);
    }
});

app.post()

app.listen(Port, () => {
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