const Expanse = require("../models/expanse");
const User = require("../models/users");
const sequelize = require("../database");
const dwnContent = require("../models/downloadedFiles");
// const users = require('../models/users');
const UserServices = require("../services/userservices");
const S3Services = require("../services/s3services");

const puppeteer = require('puppeteer');

exports.downloadExpanseAsPdf = async (req, res) => {
    // try {
    //   const browser = await puppeteer.launch();
    //   const page = await browser.newPage();
  
    //   // Set viewport size to ensure complete rendering
    //   await page.setViewport({ width: 1200, height: 800 });
  
    //   const content = `
           
    //   `; // Include your entire HTML content here
  
    //   await page.setContent(content, { waitUntil: 'networkidle2' });
  
    //   const pdfBuffer = await page.pdf({
    //     format: 'A4',
    //     printBackground: true,
    //   });
  
    //   await browser.close();
  
    //   res.setHeader('Content-Type', 'application/pdf');
    //   res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    //   res.send(pdfBuffer);
    // } catch (error) {
    //   console.error('Error generating PDF:', error);
    //   res.status(500).send('Error generating PDF');
    // }


    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      // await page.goto('http://localhost:3000/showAll.html'); // URL of the page to capture

      // Wait for an element with a specific selector to appear
      // await page.waitForSelector('#lead');

      const pdfBuffer = await page.pdf();
      await browser.close();

      res.contentType('application/pdf');
      res.send(pdfBuffer);
  } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Internal Server Error');
  }

  }

exports.downloadExpanse = async (req, res, next) => {
  try {
    const expanses = await UserServices.getExpanses(req);
    const strData = JSON.stringify(expanses);
    const fileName = `Expanse_${req.user.userName}/${new Date()}.txt`;
    console.log(fileName);
    const fileUrl = await S3Services.uploadtos3(fileName, strData);

    await req.user.createContent({
      fileUrl: fileUrl,
    });

    res.status(200).json({ fileUrl, success: true });
    console.log("expanses ", expanses);
  } catch (err) {
    console.log("err in catch downolaexpanse ", err);
    res.status(500).json({ fileUrl: "", success: false });
  }
  // res.json('a ra h');
};

exports.addExpanse = async function (req, res, next) {
  const t = await sequelize.transaction();
  const { amt, des, cat } = req.body;
  try {
    console.log(">>>>>>   1   >>>>>");
    await req.user.update(
      { totalExpanse: req.user.totalExpanse + +amt },
      { transaction: t }
    );

    console.log(">>>>>>   2   >>>>>");
    // Expanse.create({
    await req.user.createExpanse(
      {
        amt: amt,
        des: des,
        cat: cat,

        // userId: req.user.id
      },
      { transaction: t }
    );
    // console.log(amt,des,cat,req.user.id);
    console.log(">>>>>>   3   >>>>>");

    const obj = {
      amt,
      des,
      cat,
    };
    res.json(obj);
    await t.commit(); // put it in all the promises and then in the last of try blcok commit it
  } catch (err) {
    console.log("error in catch 1 ", err);
    await t.rollback();
  }
};

exports.getExpanse = (req, res, next) => {
  // console.log("user in req is     >>  ",req.user);
  const { id, userName, ispremiumuser, totalExpanse } = req.user;
  req.user
    .getExpanses(/*{where: {userId :id}} */)
    .then(async (exp) => {
      // console.log(exp);
      const urls = await req.user.getContents();
      if (urls.length > 5) {
        urls = urls.subarray(-5);
      }
      // console.log(urls);

      if (req.user.ispremiumuser)
        res.json({ exp, userName, ispremiumuser, totalExpanse, urls });
      else {
        const arr = exp.length > 10 ? exp.subarray(-10) : exp;
        res.json({ arr, userName, ispremiumuser, totalExpanse });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("<h1>error while getting response from the server</h1>");
    });
};

exports.deleteExpanse = async (req, res, next) => {
  const prodId = req.params.prodId;
  // console.log(req.params.prodId);
  Expanse.findByPk(prodId)
    .then((data) => {
      User.findByPk(data.userId).then((user) => {
        // console.log("user >>  ", user);
        user.update({ totalExpanse: user.totalExpanse - +data.amt });
      });

      return data.destroy();
    })
    .then(() => {
      console.log("destroyed data");
      res.send("deleted successfully");
    })
    .catch((err) => {
      console.log(err);
    });
  // res.send(`<h1>delete....</h1>`);
};

exports.updateExpanse = async (req, res, next) => {
  const trx = await sequelize.transaction();
  const ExpanseId = req.params.prodId;
  const { amt, des, cat } = req.body;
  // console.log("updating data -->");
  // console.log("updating data -->");
  // console.log("updating data -->");
  // console.log("updating data -->");
  // console.log("updating data -->");

  Expanse.findByPk(ExpanseId)
    .then(async (data) => {
      // console.log("data  ",data);
      const change = +amt - +data.amt;
      // console.log("change  ", change);
      User.findByPk(data.userId).then(async (user) => {
        // console.log("user >>  ", user);
        user.update(
          { totalExpanse: user.totalExpanse + +change },
          { transaction: trx }
        );
      });
      data.amt = amt;
      data.des = des;
      data.cat = cat;

      return data.save();
    })
    .then(async () => {
      res.send("updated successfully");
      trx.commit();
    })
    .catch((err) => {
      console.log(err);
      trx.rollback();
    });
};
