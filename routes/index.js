const { json } = require('body-parser');
const express = require('express');
const Router = express.Router();
const mysqlconnection = require('../connection');
const nodemail = require('nodemailer');
require('dotenv').config();


Router.get('/', (req, res)=>{
    fetchData(res);  
    //res.render('index');

});




Router.get('/my_details', (req, res)=>{
//function get_details(){
    var qry = 'select * from my_data';
        mysqlconnection.query(qry, function(err, rows, fields){
        if(err){
            throw err;
        }
        else{
            
            var global_data=[];
            for (var num in rows){                
                global_data.push(rows[num].email);
            }
            send_email_db(req=null, email_db= global_data)
            res.render('my_details', {title: 'User details', items:rows});

        }
    })  
});

Router.get('/send_email', (req, res)=>{
    res.render('send_email');
})

function send_email_db(req, email_db){
    if(req){
        receiver_email = req.body.Email;
    }
    else{
        receiver_email = email_db;
        
    }
    const email_output = `
        <p>your email</p>
        <h3>Your emails sent</h3>
        <ul>
            <li> Email ${receiver_email}</li>
        </ul>
    `;

    let tranport_email = nodemail.createTransport({
        service: 'gmail',
        auth: {
            user: 'yamin.barakat@gmail.com',
            pass: ''
        }
    });

        
    for(var sent_mail in receiver_email){
        
        let mailoptions = {
            from: "yamin.barakat@gmail.com",
            to: receiver_email[sent_mail],
            subject: "testing 31-10-2020",
            text: "HELLO WORLD",
            html: email_output
        };
    
        tranport_email.sendMail(mailoptions, (err, info)=>{
            if(err) {
                return console.log(err);
            }
            console.log('email sent %s', info.messageId );
        });
    }
}

Router.post('/send_email', (req, res)=>{
    send_email_db(req=req);
    res.redirect('/my_details');
});

Router.post('/send', (req, res)=>{
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.Email;
    var insert_qry = "insert into my_data values (default, '"+firstname+"','"+lastname+"' , '"+email+"')";
    mysqlconnection.query(insert_qry, function(err){
        if(err){
            throw err;
        }
        res.redirect('/my_details');
        
    });
});

function executeQuery(sql, cb){
    mysqlconnection.query(sql, function(error, result, field){
        if(error) {
            throw error;
        }
        console.log(result.firstname);
        var arr_result=[];
        for(var num in result){
            arr_result.push(result[num].firstname)

        }
        console.log(arr_result);
        cb(arr_result);
    });

}

function fetchData(res){
    executeQuery('select * from MyGuests', function(result ){
        //f(!err){
            //res.send(result[0]);
            res.write('<table><tr>');
            
            for(var column in result[0]){
                //for (var col in result[column]){
                    //res.write('<td><label>'+column+'</label></td>');
                    //res.write('<td><label>'+column+'</label></td>');
                    res.write('</tr>');
                    //break;

                //}                
                
            }
            for(var row in result){
                res.write('<tr>');
                res.write('<td><label>'+row+'  </label></td>');
                //console.log(row);
                for(var column in result[row]){
                    
                    res.write('<td><label>'+result[row][column]+'</label></td>');
                    //break;

                }
                res.write('</tr>');
                
            }
            res.end('</table>');

            //fetchData(rows);
        }
    );        
    
}

module.exports = Router;
