'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const toyRouter = require('./routes');

const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));

app.use(toyRouter);

app.listen(4000, () => {
  console.log('Up : 4000');
});