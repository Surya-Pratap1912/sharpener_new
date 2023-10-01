console.clear();
const express = require('express');
const path = require('path');
// const https = require('https');
const fs = require('fs');
// const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

// const privateKey = fs.readFileSync('server.key','utf8');
// const certificate = fs.readFileSync('server.cert','utf8');


// app.use(helmet());


// app.use(helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       imgSrc: ["'self'", "data:","img.freepik.com"],
//       scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net", "https://checkout.razorpay.com"],
//     },
//   }));

//   app.use(
//     helmet.contentSecurityPolicy({
//       directives: {
//         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//         'img-src': ["'self'", "data:", "img.freepik.com"],
//       },
//     })
//   );

// app.use(compression());
const accLogFiles = fs.createWriteStream(path.join(__dirname,'access.log'),{flags : 'a'});
app.use(morgan('combined',{stream : accLogFiles}));

const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');

const expanses =  require('./models/expanse');
const user =  require('./models/users');
const  order = require('./models/orders');
const forgetPassReq = require('./models/forg-pass-requests');
const dwnContent = require('./models/downloadedFiles');

const router = require('./routes/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors(/*{
    origin:'http://127.0.0.1:5501',
    methods:['GET', 'PUT', 'DELETE','POST']
}*/))
app.use(express.static(path.join(__dirname,'public')));

// app.set('views', 'views');

app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self' https://cdnjs.cloudflare.com https://api.razorpay.com https://cdn.jsdelivr.net https://checkout.razorpay.com https://img.freepik.com 'unsafe-inline'" 
    );
    next();
  });
  


app.use(router);

user.hasMany(expanses);
expanses.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

user.hasMany(forgetPassReq);
forgetPassReq.belongsTo(user);

user.hasMany(dwnContent);
dwnContent.belongsTo(user);

sequelize
.sync({force: false})
.then(result =>{
    console.log('yha se suru hai');
    app.listen(process.env.PORT||3000);
})
.catch(err =>{
  console.log(err);
})