const mysql = require('mysql')
const conn = mysql.createConnection({
    host:"localhost",
    user :"root",
    password:"Arifmdc@9",
    database:"user",
   
});
conn.connect( err => {
 if (err){
     console.log(err)
 }else{
     console.log("Mysql connected successfully");
 }
})
module.exports = conn;