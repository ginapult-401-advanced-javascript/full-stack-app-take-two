'use strict';

const express = require('express');
const uuid = require('uuid/v4');

const router = express.Router();

let toys = {
  '10': {_id: '10', name: 'Baby Khaleesi', toy: 'Dumbells',},
  '20': {_id: '20', name: 'Ginger', toy: 'Bananas',},
  '30': {_id: '30', name: 'Khal Basil', toy: 'Anything',},
  '40': {_id: '40', name: 'Rosie', toy: 'Balls',},
  '50': {_id: '50', name: 'Demi Dog', toy: 'Rope',},
};

router.get('/toys', (req, res) => {
  res.send(toys);
});

router.post('/toys', (req, res) => {
  let id = uuid();
  toys[id] = { _id: id, name: req.body.name, toy: req.body.toy, };
  res.json(toys);
});

router.delete('/toys/:id', (req, res) => {
  const deleteId = req.body._id;
  delete toys[deleteId];
  res.send(toys);
});

module.exports = router;