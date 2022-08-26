
const express = require('express');
const router = express.Router();
const path = require("path");

const { MongoClient} = require("mongodb");

const url = "mongodb://147.182.210.130:27017/";

router.post("/login", async (req, res, next) => {
    const client = new MongoClient(url);
  
    try {
  
        const dbName = "DOGGER";
        await client.connect();
        const db = client.db(dbName);
        const walkers_collection = db.collection('dog_walkers');
        const owners_collection = db.collection('dog_owners');
        const {fields} = req.body;
        let findResult = await walkers_collection.findOne({
              "info.email": fields.email,
              "info.password": fields.password,
        },{projection: {info:1}});

       if(!findResult){
           findResult = await owners_collection.findOne({
              "info.email": fields.email,
              "info.password": fields.password,
        },{projection: {info:1}});

       }

        let error = findResult?"":'Credenciales incorrectas'
        res.json({ error, info: findResult?.info});


    } catch (err) {
      console.error(err);
      next(err);
    } finally {
      client.close();
    }
  }
)
  module.exports = router

