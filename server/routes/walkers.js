const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require('fs').promises;

const { MongoClient, Collection } = require("mongodb");

const url = "mongodb://147.182.210.130:27017/";


 router.post("/new_walker", async (req, res, next) => {
  const client = new MongoClient(url);
 
  try {
    const dbName = "DOGGER";
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const {confirmPassword,...fields} = req.body.fields;
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
        active: true,
        serviceTimes:{}
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

router.post("/upload_walker_times", async (req, res, next) => {
  const client = new MongoClient(url);
  try {
    const dbName = "DOGGER";
    await client.connect();
    const db = client.db(dbName);
    const {email, times, date} = req.body;
    const collection = db.collection('dog_walkers');
    console.log(date)
   let seviceString = `serviceTimes.${date}`
    const findResult = await collection.findOneAndUpdate({'info.email': email.trim()},{$set:
      {[seviceString]:times}
    },{ returnDocument: "after"});
  let error=findResult?'':'error';
  res.json({ error });
 
  } catch (err) {
    console.error(err);
    next(err);
  } finally {
    client.close();
  }
});

router.post("/get_walker_times", async (req, res, next) => {
  const client = new MongoClient(url);
  try {
    const dbName = "DOGGER";
    await client.connect();
    const db = client.db(dbName);
    const {email, date} = req.body;
    console.log(req.body)
    const collection = db.collection('dog_walkers');
   let seviceString = `serviceTimes.${date}`
   const findResult = await collection.findOne({'info.email': email.trim()},
   {projection: {[seviceString]:1}});
   //console.log(findResult)
  
     res.json(findResult);

  } catch (err) {
    console.error(err);
    next(err);
  } finally {
    client.close();
  }
});

module.exports = router;

