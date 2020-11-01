const mysql = require('mysql');
require('dotenv').config();

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Ro@20202020',
    database: 'my_db',
    multipleStatements:true

});

mysqlconnection.connect((err)=>{
    if(!err){
        console.log('connected');
    }
    else{
        console.log('connection failed'+err);
    }
});

module.exports=mysqlconnection;