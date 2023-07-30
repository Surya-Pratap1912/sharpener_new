const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');

const router = require('./routes/router');

app.use(bodyParser.json());
app.use(cors({
    origin:'http://127.0.0.1:5500',
    methods:['GET', 'PUT', 'DELETE','POST']
}))


app.get('/',(req, res, next)=>{
    res.send('<h1>Yes I am listening...........!</h1>');
})

app.use(router);



sequelize
.sync()
.then(result =>{
    console.log('yha se suru hai');
    app.listen(3000);
})