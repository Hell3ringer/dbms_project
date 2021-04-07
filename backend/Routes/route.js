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

router.get('/courses',(req,res)=>{
    var sql_query="SELECT * FROM COURSE";
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log("error on retrieving from courses "+err);
        }
        else{
            console.log("result is "+JSON.stringify(result));
            res.send(result);
        }
    })
})

router.post('/add_course',(req,res)=>{
    var sql_statement="INSERT INTO course VALUES('"+req.body.course.c_id+"','"+req.body.course.c_name+"','"+req.body.course.handout+"','"+req.body.course.credits+"','"+req.body.course.mids+"','"+req.body.course.compre+"')";

    db.query(sql_statement,(err,result)=>{
        if (err) {
            console.log('error inserting values' + err);
        }else{
            return res.status(200).json("token");
        }
    })
})

router.post('/delete_course',(req,res)=>{
    var sql_statement="DELETE FROM course WHERE c_id='"+req.body.c_id+"'";

    db.query(sql_statement,(err,result)=>{
        if (err) {
            console.log('error deleting values' + err);
        }else{
            return res.status(200).json("token");
        }
    })
})

router.post('/register_student',(req,res)=>{
    var sql_statement="INSERT INTO registers VALUES('"+req.body.pair.c_id+"','"+req.body.pair.s_id+"')";

    db.query(sql_statement,(err,result)=>{
        if (err) {
            console.log('error inserting values' + err);
        }else{
            return res.status(200).json("token");
        }
    })
})

router.post('/registered_courses',(req,res)=>{
    console.log(req.body.student.s_id);
    var sql_query="SELECT course.c_id,course.c_name FROM registers,course WHERE registers.s_id='"+req.body.student.s_id+"' AND registers.c_id=course.c_id";
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log("error on retrieving from registers "+err);
        }
        else{
            console.log("result is "+JSON.stringify(result));
            res.send(result);
        }
    })
})

router.post('/update_course',(req,res)=>{
    console.log(req.body.course.c_id);
    var sql_query="UPDATE course SET c_name='"+req.body.course.c_name+"', handout='"+req.body.course.handout+"', credits='"+req.body.course.credits+"', mids='"+req.body.course.mids+"', compre='"+req.body.course.compre+"' "+"WHERE c_id='"+req.body.course.c_id+"'";
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log("error on Updating course "+err);
        }
        else{
            console.log("result is "+JSON.stringify(result));
            return res.status(200).json(result);
        }
    })
})

router.post('/delete_registered_course',(req,res)=>{
    console.log(req.body.pair.c_id);
    var sql_query="DELETE FROM registers WHERE c_id='"+req.body.pair.c_id+"' AND s_id='"+req.body.pair.s_id+"'";
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log("error on deleting in registers "+err);
        }
        else{
            // console.log("result is "+JSON.stringify(result));
            res.send(result);
        }
    })
})

module.exports = router;