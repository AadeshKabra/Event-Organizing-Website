const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render('server.js');
})

app.listen(3000, function(req, res){
    console.log("Server started at port 3000")
})