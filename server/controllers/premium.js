const User = require("../models/users");

exports.showLead = (req, res, next) => {
//   console.log("in premium user >> ", req.user);
  if (req.user.ispremiumuser) {
    User.findAll({
      attributes: ["userName", "totalExpanse"],
    }).then((users) => {
      users.sort(function (a, b) {
        return b.totalExpanse - a.totalExpanse;
      });
    //   console.log(users);
      res.json(users);
    });
  } else {
    res.json({ success: false, messege: "not a prime user" });
  }
};


