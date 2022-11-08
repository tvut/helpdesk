const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records.
recordRoutes.route('/sessions').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('tutorSessions')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new record.
recordRoutes.route('/addRecord').post(function (req, res) {
  if(!req.body.hasOwnProperty('tutor')){
    res.status(400).send("Missing tutor name.")
    return
  }
  if(req.body.tutor == ""){
    res.status(400).send("Blank tutor name invalid.")
    return
  }
  const dbConnect = dbo.getDb();
  const matchDocument = {
    tutor: req.body.tutor,
    date: Date()
  };

  dbConnect
    .collection('tutorSessions')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new tutor session with id ${result.insertedId}`);
        res.status(204).send(result.insertedId);
      }
    });
});

// This section will help you delete a record.
recordRoutes.route('/sessions/delete/:id').delete((req, res) => {
  var ObjectId = require('mongodb').ObjectID;
  const dbConnect = dbo.getDb();

  const id = req.params.id;
  console.log(id)
  if (id === undefined || id === '') {
      res.status(400).send('Could not delete report.\nMust include a report ID.');
      return;
  }

  dbConnect
  .collection('tutorSessions').deleteOne({"_id": ObjectId(id)}, (err, result) => {
      if (err) {
          res.status(500).send(`Error deleting report ${id}.\n${err}`);
      }
      else if (result.n == 0) {
          res.status(400).send(`Could not delete report ${id}.\nReport ${id} not found.`);
      }
      else if (result.deletedCount == 0) {
          res.status(500).send(`Error deleting report ${id}.\n`);
      }
      else {
          res.status(200).send('Success');
      }
  });
});

module.exports = recordRoutes;
