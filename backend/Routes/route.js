const { Router } = require('express');
const Swal = require('sweetalert2')

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

router.post('/login',async (req,res) =>{   
    let userID = req.body.id;
    let userPass = req.body.pass;  
    const role = userID[0];    
    console.log("role is " + role + " pass is " + userPass);  
    let sql_statement = "SELECT * FROM details WHERE id = ? ";      
    db.query(sql_statement,[userID],async (err ,result) => {     
            if (err) {
                console.log('error getting users');
                return res.send('-2')
            }else{                
                 if (result.length == 0) {
                    console.log("user dosent exist!!");
                    return res.send('-1');
                }else(await bcrypt.compare(userPass,result[0].password,(error,response) => {
                    if (error) {
                        console.log(error);                        
                    }else{                        
                        if (response) {
                            console.log('login successfull');                                                                                        
                            return res.send('1');
                        }else{
                            console.log('wrong password!!');
                            return res.send('2')
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
        sql_statement = "INSERT INTO student (s_id,s_name,s_email,s_contact_no) values (?,?,?,?)";
    } else if(userRole === "professor"){
        sql_statement = "INSERT INTO professor (p_id,p_name,p_email,p_contact_no) values (?,?,?,?)";
    }else{
        console.log("users role error or admin ");
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

router.post('/searchCourse',(req,res) =>{
    console.log(req.body);
    var sql_statement = "select * from course where (c_name) = ('"+req.body.c_name+"')";

    db.query(sql_statement,(err ,result) => {
        if (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error finding the course!'
              })
            console.log('error finding course' + err);
        }else{
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

router.get('/profRating',(req,res) =>{
    var sql_statement = "select * from  prof_rating_view";
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error finding ratings' + err);
        }else{
            console.log("rows" + result);
            res.send(result)}
        }
        )
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