// const express = require('express');
const { response } = require("express");
const sequelize = require("../database");
const Users = require("../models/users");

exports.signUp = (req, res, nex) => {
  console.log(req.body);
  const user = req.body;

  Users.create({
    id: user.mail,
    userName: user.name,
    password: user.password,
  })
    .then((response) => {
      res.send("signed up successfully");
    })
    .catch((err) => {
      res.send("user already exists");
    });
};

exports.login = (req, res, nex) => {
  const mail = req.body.mail;
  const psw = req.body.password;
  console.log(psw);
  Users.findByPk(mail)
    .then((user) => {
    //   console.log(typeof(user.dataValues.password));
    //   console.log(user.dataValues);
      if (user ) {
        if (psw == user.dataValues.password) {
          res.send(`${user.dataValues.userName} logged in successfully`);
        } else {
          res.send("incorrect password");
        }
      } else {
        res.send("user doesn't exist, please sign up");
      }
    })
    .catch((e) => {
      console.log(e);
    });

//   res.send("a gya");
};
