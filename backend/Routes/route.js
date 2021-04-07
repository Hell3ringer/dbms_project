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
    let userRole = req.body.role;
    let userPassword = req.body.pass;
    let userID = req.body.id;
    console.log("id " +userID + " req id " + req.query.id + " pass " + userPassword  + " req " + JSON.stringify(req.body,null,2)); 
    const saltPassword = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(userPassword,saltPassword);    
    var sql_statement = "INSERT INTO details (id,password,role) values ('"+userID +"','"+securedPassword +"','"+userRole + "')";
    
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error inserting values' + err);
            res.status(404);            
        }else{
            console.log("data entered to details table");
            res.status(200).send(userRole);
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

router.post('/details',async (req,res) => {
    const userID = req.body.id;
    const userName = req.body.name;
    const userContactNo = req.body.contact_no;
    const userRole = req.body.role;    
    const userEmail = req.body.email;  
    console.log("user name " + userName);   
    if (userRole === "student") {
        sql_statement = "INSERT INTO student (id,name,email,contact_no) values (?,?,?,?)";
    } else if(userRole === "professor"){
        sql_statement = "INSERT INTO professor (id,name,email,contact_no) values (?,?,?,?)";
    }else{
        sql_statement = "INSERT INTO admin (id,name,email,contact_no) values (?,?,?,?)";
    }
    
    
    db.query(sql_statement,[userID,userName,userEmail,userContactNo],(err ,result) => {
        if (err) {
            console.log('error inserting values' + err);
            return res.status(404);
        }else{
            console.log("values added");
            return res.status(200).json(result);
        }
    })
})


router.post('/professorDetails', (request,response) => {
    const userID = request.body.id
    const userName = request.body.name
    const userEmail = request.body.email
    const userContactNo = request.body.contact_no
    console.log("id is " + userID + " name is "+ userName);

    sql = "insert into professor (id,name,email,contact_no) values (?,?,?,?)"
    db.query(sql,[userID,userName,userEmail,userContactNo],(err,result) => {
        if (err) {
            console.log("error in professordetails " + error);
        } else {
            console.log("values added in professor");
            return response.status(200).json(result);
        }
    })

    //return response.status(200).json(userID+userName);
})





router.get('/users',(req,res) =>{
    var sql_statement = "select * from  details ";
    //var values = [req.query.id,req.query.pass,req.query.role];
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error inserting values' + err);
        }else{
            console.log("rows" + JSON.stringify(result,null,2));
            res.send(result)
        }
    })
})

module.exports = router;