const express = require('express');
const path = require('path');
const fs = require("fs")
const PORT = 3001 || process.env.PORT
const {v4: uuidv4} = require('uuid')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
//re study above lines

