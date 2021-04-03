const { Router, json } = require('express');

const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const db = mysql.createConnection({
    user:process.env.database_user,
    host:process.env.database_host,
    password:process.env.database_password,
    database:process.env.database
})


router.post('/signup',async (req,res) =>{
    let userRole = req.query.role;
    let userPassword = req.query.pass;
    let userID = req.query.id;
    console.log("id " +userID + " req id " + req.query.id + " pass " + userPassword  + " req " + JSON.stringify(req.query,null,2)); 
    const saltPassword = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(userPassword,saltPassword);    
    var sql_statement = "INSERT INTO details (id,password,role) values ('"+userID +"','"+securedPassword +"','"+userRole + "')";
    
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error inserting values' + err);
        }else{
            return res.status(200).json(userRole);
        }
    })
})

router.get('/login',async (req,res) =>{   
    let userID = req.query.id;
    let userPass = req.query.pass;
    console.log("id " +userID + " pass " + userPass); 
    let sql_statement = "SELECT * FROM details WHERE id = ? ";      
    db.query(sql_statement,[userID],async (err ,result) => {     
            if (err) {
                console.log('error getting users');
                return res.status(404)
            }else{
                
                 if (result.length == 0) {
                    console.log("user dosent exist!!");
                    res.status(202);
                    
                }else(await bcrypt.compare(userPass,result[0].password,(error,response) => {
                    if (error) {
                        console.log(error);                        
                    }else{
                        console.log("response from bcrypt " + response);
                        if (response) {
                            console.log('login successfull');                                       
                            res.status(200) 
                        }else{
                            console.log('wrong password!!');
                            res.status(201)
                        }
                    
                }}))             
                
                
            } 
       })

})

router.post('/details',(req,res) => {
    const userName = req.query.name;
    const userContactNo = req.query.contactNo;
    const userID = req.query.id;
    const userEmail = req.query.email;       
    var sql_statement = "INSERT INTO student (id,name,email,contact_no) values ('"+userID +"','"+userName +"','"+userEmail + "','"+userContactNo +"')";
    
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error inserting values' + err);
        }else{
            return res.status(200);
        }
    })
})

router.get('/users',(req,res) =>{
    var sql_statement = "select * from  details";
    var values = [req.query.id,req.query.pass,req.query.role];
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error inserting values' + err);
        }else{
            console.log("rows" + {result});
            res.send(result)
        }
    })
})

module.exports = router;