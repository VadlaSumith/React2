const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;


const app = express();

app.use(express.json());
app.use(cors());

//create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'lowt1'
 });

 //create route
 app.post("/register", (req,res) =>{
    const username = req.body.username
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    bcrypt.hash(password,saltRounds,(err,hash)=>{

        if(err){
            console.log(err)
        }
        db.query (
            "INSERT INTO usercredentials(username,password) VALUES (?,?)",
            [username,hash],
            (err,result) =>{
                console.log(err);
            }
        );
    })
    
});
        
app.post("/login", (req,res) =>{
    const firstname = req.body.firstname;
    const username = req.body.username;
    const password = req.body.password;

    db.query (
        "SELECT *  FROM usercredentials WHERE username =? ;",
        username,
        (err,result) =>{
            if(err){
            res.send({err: err});
            }
                if (result.length > 0){
                    bcrypt.compare(password, result[0].password,(error,response)=>{
                        if(response) {
                            console.log(result);           
                            res.send(result)
                        } else{
                            res.send({message:"wrong password combo"});
                        }                 
                       })
                } else{
                    res.send({message:"User doesnt exist"});
                }
            }
    );
});


 app.listen(5003 , ()=>{
    console.log('Login Server started 5003 ....');
});