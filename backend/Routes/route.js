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

router.post('/get_enrolled_students',(req,res)=>{
    var sql_query="SELECT s_id from registers WHERE c_id='"+req.body.course.c_id+"'";
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log("error in getting sid"+err);
        }
        else{
            res.status(200).send(result);
        }
    })
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

router.post('/profile', (request,response)=>{
    const userID=request.body.id
    const userName=request.body.name
    const userEmail=request.body.email
    const userContactNo=request.body.contact_no
    console.log("id is" + userID + " name is "+ userName);

    response.status(200).json(userID+userName);
})

router.post('/get_student_details',(req,res)=>{
    var sql_statement = "SELECT * FROM student WHERE s_id='"+req.body.student.s_id+"'";
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error getting values' + err);
        }else{

            //console.log("rows" + JSON.stringify(result,null,2));
            console.log(result);
            res.status(200).send(result)
        }
    })
})

router.post('/modify_student',(req,res)=>{
    console.log(req.body.student.s_id);
    var sql_query="UPDATE student SET s_name='"+req.body.student.name+"', s_email='"+req.body.student.email+"', s_contact_no='"+req.body.student.contact_no+"' "+"WHERE s_id='"+req.body.student.id+"'";
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log("error on Updating student details "+err);
        }
        else{
            //console.log("result is "+JSON.stringify(result));
            return res.status(200).json(result);
        }
    })
})

router.post('/get_prof_details',(req,res)=>{
    var sql_statement = "SELECT * FROM professor WHERE p_id='"+req.body.prof.p_id+"'";
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error getting values' + err);
        }else{

            //console.log("rows" + JSON.stringify(result,null,2));
            console.log(result);
            res.status(200).send(result)
        }
    })
})

router.post('/modify_prof',(req,res)=>{
    console.log(req.body.prof.p_id);
    var sql_query="UPDATE professor SET p_name='"+req.body.prof.name+"', p_email='"+req.body.prof.email+"', p_contact_no='"+req.body.prof.contact_no+"' "+"WHERE p_id='"+req.body.prof.id+"'";
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log("error on Updating student details "+err);
        }
        else{
            //console.log("result is "+JSON.stringify(result));
            return res.status(200).json(result);
        }
    })
})
router.post('/feedback_course',async (req,res) =>{
    let rating = req.body.rating;
    let review= req.body.review;  
    let s_id = req.body.s_id; 
    let c_id=req.body.c_id   
     
    var sql_statement = "INSERT INTO feedback_course (c_id,s_id,c_rating,c_review) values ('"+c_id +"','"+s_id +"','"+ rating+ "','"+review + "')";
    
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error inserting values' + err);
            res.sendStatus(404); 
                   
        }else{
            console.log("data entered to details table");
            res.sendStatus(200);
        }
    })
})

router.post('/feedback_professor',async (req,res) =>{
    let rating = req.body.rating;
    let review= req.body.review;  
    let s_id = req.body.s_id; 
    let p_id=req.body.p_id   
     
    var sql_statement = "INSERT INTO feedback_prof(s_id,p_id,p_rating,p_review) values ('"+s_id +"','"+p_id +"','"+ rating+ "','"+review + "')";
    
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error inserting values' + err);
            res.sendStatus(404); 
                   
        }else{
            console.log("data entered to details table");
            res.sendStatus(200);
        }
    })
})

router.get('/professor',(req,res) =>{
    var sql_statement = "select * from  professor ";
    //var values = [req.query.id,req.query.pass,req.query.role];
    db.query(sql_statement,(err ,result) => {
        if (err) {
            console.log('error retiriving values' + err);
        }else{

            console.log("rows" + JSON.stringify(result,null,2));


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
            //console.log("result is "+JSON.stringify(result));
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
    var sql_statement2="DELETE FROM registers WHERE c_id='"+req.body.c_id+"'";
    db.query(sql_statement2,(err,result)=>{
        if(err){
            console.log('error deleting in registers'+err);
        }
    })
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
    var sql_query="SELECT course.c_id,course.c_name,course.handout,course.credits,course.mids,course.compre FROM registers,course WHERE registers.s_id='"+req.body.student.s_id+"' AND registers.c_id=course.c_id";
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log("error on retrieving from registers "+err);
        }
        else{
            //console.log("result is "+JSON.stringify(result));
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
            //console.log("result is "+JSON.stringify(result));
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

router.post('/get_feedback_course',(req,res)=>{
    console.log("c_id is "+req.body.course.c_id);
    var sql_query="SELECT s_id,c_id,c_rating,c_review FROM feedback_course WHERE c_id='"+req.body.course.c_id+"'";
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
router.post('/allotted_courses',(req,res)=>{
        console.log("this is "+req.body.professor.p_id+" from backend");
        var sql_query="SELECT c.c_id, c.c_name, c.credits FROM course c, teaches t WHERE t.p_id='"+req.body.professor.p_id+"'AND t.c_id = c.c_id";
        db.query(sql_query,(err,result)=>{
            if(err){
                console.log("error retrieving from teaches"+err);
            }
            else{
                console.log("result of allotted courses is "+JSON.stringify(result));
                res.send(result);
            }
        })
    
})

router.post('/view_students',(req,res)=>{
    console.log("from backend - "+req.body.c_id);
    var sql_query="SELECT s.s_id, s.s_name, s.s_email, s.s_contact_no FROM student s, registers r WHERE s.s_id=r.s_id AND r.c_id = '"+req.body.c_id+"'";
    
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

router.get('/prof',(req,res)=>{
    // console.log("p_id is "+req.body.prof.p_id);
    var sql_query="SELECT * FROM professor";
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

router.post('/get_prof_details',(req,res)=>{
    console.log("p_id is "+req.body.prof.p_id);
    var sql_query="SELECT p_id,p_name,p_email,p_contact_no FROM professor WHERE p_id='"+req.body.prof.p_id+"'";
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

router.post('/get_feedback_prof',(req,res)=>{
    console.log("p_id is "+req.body.prof.p_id);
    var sql_query="SELECT s_id,p_id,p_rating,p_review FROM feedback_prof WHERE p_id='"+req.body.prof.p_id+"'";
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log("error on retrieving from registers "+err);
        }
        else{
            console.log("result is "+JSON.stringify(result));
            res.send(result);
        }
    })
            console.log("result of students is "+JSON.stringify(result));
            res.send(result);
        }
    )


router.post('/courseprof',(req,res)=>{
    console.log("from backend - "+req.body.c_id);
    var sql_query="SELECT p.p_name FROM professor p, teaches t WHERE p.p_id=t.p_id AND t.c_id = '"+req.body.c_id+"'";
    
    db.query(sql_query,(err,result)=>{
        if(err){
            console.log("error on retrieving profs from teaches"+err);
        }
        else{
            console.log("profs of the course are "+JSON.stringify(result));
            res.send(result);
        }
    })

})

module.exports = router;