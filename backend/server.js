const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();

const routeURL = require('./Routes/route')
const cors = require('cors');
const mysql = require('mysql')
const db = mysql.createConnection({
    user:process.env.database_user,
    host:process.env.database_host,
    password:process.env.database_password,
    database:process.env.database
})

db.connect((err) =>{
    if(!err) {console.log("database connected..");}
    else{console.log('database not connected !!! --- error');}
})


//app.disable("x-powered-by");
app.use(express.json())
//app.use(cookieParser()) 
app.use(cors());
app.use('/app',routeURL)
app.listen(4000,() => console.log('server is open'))