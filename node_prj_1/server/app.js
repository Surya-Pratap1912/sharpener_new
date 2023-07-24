const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./database');
const routes = require('./1.routes/routes');

app.use(bodyParser.json());

//to deal wit cors issues
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  app.use(routes);

  app.get('/', (req,res,next)=>{
    res.send('<h1>listening.....!</h1>');
  })

sequelize.sync()
.then((result)=>{
    console.log(result);
    app.listen(3000);
    console.log("server running.....");
})
.catch((err)=>{
    console.log(err);
})