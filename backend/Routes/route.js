const { Router } = require('express');

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
    const saltPassword = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.params.pass,saltPassword)
    var sql_statement = "INSERT INTO details (id,password,role) values ('"+req.body.params.id +"','"+securedPassword +"','"+req.body.params.role + "')";
    
    var values = [req.body.params.id,req.body.params.pass,req.body.params.role];
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error inserting values' + err);
        }else{
            return res.status(200).json("token");
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
            console.log("rows" + result);
            res.send(result)
        }
    })
})

router.post('/searchCourse',(req,res) =>{
    console.log(req.body);
    var sql_statement = "select * from course where (c_name) = ('"+req.body.c_name+"')";

    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error finding course' + err);
        }else{
            res.send(result)
        }
    })
})

module.exports = router;