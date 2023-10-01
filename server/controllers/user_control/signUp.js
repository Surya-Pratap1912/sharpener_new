const sequelize = require("../../database");
const Users = require("../../models/users");
const bcrypt = require('bcrypt');


exports.signUp = (req, res, nex) => {
    console.log(req.body);
    const {name : userName, mail : id, password } = req.body;
  
    //encrypting the passwords
  
    bcrypt.hash(password, 10 /* salt */, (err, hash)=>{
      console.log(err);
      Users.create({
        id,
        userName,
        password : hash
      })
        .then((response) => {
          res.status(201).json({message:"signed up successfully, go to login"});
        })
        .catch((err) => {
          // console.log(err);
          res.status(500).json({message:"user already exists, please try logging in"});
        });
  
    } )
  
   
  };