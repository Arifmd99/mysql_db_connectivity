const express = require('express')
const app = express()
const conn = require('./connection/mysql')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const path = require('path')
const util = require('util')
// const query = util.promisify(conn.query).bind(conn)
const PORT =3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// viewsDirectory static files path set
const viewsDirectory = path.join(__dirname , '../templates/views')
//hbs setup
app.set('view engine', 'hbs')
app.set('views',viewsDirectory)
//restful api's
//create
app.get('/add_user', (req,res)  =>{
    res.render('createuser')
})
app.post('/create_user',(req,res) =>{
   conn.query('INSERT INTO user_details SET ? ',{...req.body},(error, result) =>{
       if(error) return res.json({error})
       res.redirect('/select_user')
   })
})
//update
app.get('/update_user/:id', (req,res)  =>{
   conn.query(`SELECT user_id,user_name,user_address,user_mobile,user_age,user_gender FROM user_details WHERE user_id= ${req.params.id}`,(error,result)=>{
        if (error) return res.json({error})
        res.render('updateuser',{...result[0]}) 
    })
})
app.post('/update_user/:id',(req,res) =>{
   conn.query(`UPDATE user_details SET ? WHERE user_id =${req.params.id}`,{...req.body},(error, result) =>{
       if(error)  return res.json({error})
      res.redirect('/select_user')
   })
})
//delete
app.get('/delete_user/:id',(req,res) =>{
    conn.query(`DELETE FROM user_details WHERE user_id=${req.params.id}`,(error,result) =>{
        if(error) return res.json({error});
        res.redirect('/select_user') 
    })
})
//select
app.get('/select_user',(req,res) =>{
    conn.query('SELECT * FROM user_details ' ,(error,result)=>{
        if(error) return res.json({error})
        res.render('selectuser', {result})
    })
})
// setting port 
app.listen(PORT, () =>{
 console.log('Server listening on port 3000');
})
