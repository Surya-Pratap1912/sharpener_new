
const sequelize = require("../../database");
const Users = require("../../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





function generateAccessToken (id, /* ispremiumuser */)
{
  return jwt.sign({userId : id, /* ispremiumuser */ }, /*secret code  */ '2ih8y93jdb8y!EDWD2#jihajx73$5%(83990');
}

exports.login = (req, res, nex) => {
  const {mail, password } = req.body;
  
  // console.log(password);
  Users.findByPk(mail)
    .then((user) => {
    //   console.log(typeof(user.dataValues.password));
    //   console.log(user.dataValues);
      if (user ) {

        bcrypt.compare(password, user.dataValues.password, (err ,  result )=>{
          if(err)
          {
            console.log(err);
            res.status(500).json({success: false , message  : 'something went wrong'});
          }
          else{
            if(result)
            {
              res.status(200).json({success :  true, user :user.dataValues.userName,  message : `${user.dataValues.userName} logged in successfully`, token : generateAccessToken(mail /*,user.dataValues.ispremiumuser */)});
            }
            else{
              res.status(200).json({success: false , message: 'password is incorrect'});
            }
          }
        })

       
      } else {
        res.status(200).send("user doesn't exist, please sign up");
      }
    })
    .catch((e) => {
      console.log(e);
    });

//   res.send("a gya");
};