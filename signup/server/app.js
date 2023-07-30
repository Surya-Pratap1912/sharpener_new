const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./database');
const routes = require('./routes/routes');
const cors = require('cors');

app.use(bodyParser.json());

  // to allow all access 
  app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  
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