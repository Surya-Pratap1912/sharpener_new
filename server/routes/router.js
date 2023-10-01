const express = require('express');
const path = require('path');
const router = express.Router();
const signUp = require('../controllers/user_control/signUp');
const login  = require('../controllers/user_control/login');
const forgetPass = require('../controllers/user_control/forgetPassword');
const expanse = require('../controllers/expanse');
const userAuth = require('../middleware/auth');
const purchaseController = require('../controllers/purchase');
const premium = require('../controllers/premium');

//navigations

router.get('/login',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','login.html'));
  })
  
  router.get('/signup',(req, res, next)=>{
      res.sendFile(path.join(__dirname,'..','views','signUp.html'));
      // res.sendFile(path.join(__dirname,'..','client/public/sign_up','index.html'));
  })
  router.get('/forget-password',(req, res, next)=>{
      res.sendFile(path.join(__dirname,'..','views','forget-password.html'));
      // res.sendFile(path.join(__dirname,'..','client/public/sign_up','index.html'));
  })
  router.get('/expanse-tracker',(req, res, next)=>{
      res.sendFile(path.join(__dirname,'..','views','expanseTracker.html'));
      // res.sendFile(path.join(__dirname,'..','client/public/sign_up','index.html'));
  })
  router.get('/showAll.html',(req, res, next)=>{
      res.sendFile(path.join(__dirname,'..','views','showAllExpanse.html'));
      // res.sendFile(path.join(__dirname,'..','client/public/sign_up','index.html'));
  })
  router.get('/',(req, res, next)=>{
      res.redirect('/signup')
      // res.sendFile(path.join(__dirname,'..','client/public/sign_up','index.html'));
  })


//users
router.post('/users/signUp', signUp.signUp);

router.post('/users/login', login.login);

router.post('/password/forget-password',forgetPass.forgetPass);
router.get('/password/resetpassword/:uu_id',forgetPass.resetPass);

router.post('/password/resetpassword',forgetPass.changePass);

//expanse
router.post('/add-expanse',userAuth.Authenticate, expanse.addExpanse);

router.get('/get-expanse',userAuth.Authenticate, expanse.getExpanse);

router.delete('/delete-expanse/:prodId',userAuth.Authenticate, expanse.deleteExpanse);

router.put('/update-expanse/:prodId',userAuth.Authenticate, expanse.updateExpanse);

//premium 

// router.get('/purhase/premuiumMembership',userAuth.Authenticate, purchaseController.purchasePremium );
router.get('/purhase/premuiumMembership',userAuth.Authenticate,purchaseController.purchasePremium);
 router.post('/purchase/updatetransectionstatus',userAuth.Authenticate,purchaseController.updatetransectionstatus);

router.get('/premium/showLeaderBoard',userAuth.Authenticate,premium.showLead )

router.get('/dowload/download-expanse',userAuth.Authenticate,expanse.downloadExpanse )

router.get('/generate-pdf',userAuth.Authenticate, expanse.downloadExpanseAsPdf)

module.exports = router;



