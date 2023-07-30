// const express = require('express');
const { response } = require('express');
const sequelize = require('../database');
const Users = require('../models/users');


exports.addUser = (req,res, nex)=>{
    console.log(req.body);
    const user = req.body;
   
    Users.create({
        id: user.mail,
        userName: user.name,
        password :  user.password
    }
        
    )
    .then(response =>{
        res.send(response);
    })
    .catch(err =>{
        res.send("user already exists");
    })
    
}