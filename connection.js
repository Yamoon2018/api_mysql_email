const mysql = require('mysql');
require('dotenv').config();

var mysqlconnection = mysql.createConnection({
    host: 'localhost',//'us-cdbr-east-02.cleardb.com',
    port: '3306',
    user: 'root',//'b49624e04efca6',
    password: 'Ro@20202020',//'03658a96',
    database: 'my_db',//'heroku_821a89d07264a26',
    multipleStatements:true

});

mysqlconnection.connect((err)=>{
    if(!err){
        console.log('MYSQL connected');
    }
    else{
        console.log('connection failed'+err);
    }
});

module.exports=mysqlconnection;