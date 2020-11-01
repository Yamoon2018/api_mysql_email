const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql');
const PoepleRoutes = require('./routes');
//const jade = require('jade');
const path = require('path');
//const nodemailer = require('nodemailer');

require('dotenv').config();

//const mysqlconnection = require('./connection');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', PoepleRoutes);
app.set('view engine' , 'jade');
app.set('views', path.join(__dirname, 'views'));



app.listen(3000 , (err)=>{
    if(!err){
        console.log('Server working on port 3000');
    }
})