const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require('fs').promises;

const { MongoClient, Collection } = require("mongodb");

const url = "mongodb://147.182.210.130:27017/";

// Crear un nuevo paseador
router.post("/new_walker", async (req, res, next) => {
  const client = new MongoClient(url);
 
  try {
    const dbName = "DOGGER";
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const {confirmPassword,...fields} = req.body.fields;
    //console.log(fields)
    const collection = db.collection('dog_walkers');
    const findResult = await collection.findOne({'info.email': fields.email.trim()});
    let error = '';
    if (findResult) {
      error = "Este paseador ya existe!!!";
      res.json({ error });
    }
    else {
      await collection.insertOne({
        info: { ...fields },
        schedule:{},
        active: true
      });
      res.json({ error });
    }
  } catch (err) {
    console.error(err);
    next(err);
  } finally {
    client.close();
  }
});


module.exports = router;

