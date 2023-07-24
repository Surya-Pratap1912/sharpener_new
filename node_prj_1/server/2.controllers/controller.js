const Data = require('../models/bill');

exports.postPushData = (req, res, next )=>{
    const {price, dish, tab } = req.body;
    
    Data.create({
        price: price,
        dish: dish,
        tab: tab
    })
    .then((result)=>{
        console.log(result);
    })
    .catch((err)=>{
        console.log(err);
    })
    

    const obj = {
       price, dish, tab
    }
    res.json(obj);
}

exports.getGetData = (req,res, next)=>{
    Data.findAll()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        console.log(err);
        res.send('<h1>error while getting response from the server</h1>');
    })
}


exports.deleteData = (req, res, next )=>{
    const prodId = req.params.prodId;
    // console.log(req.params.prodId);
    Data.findByPk(prodId)
    .then(data=> {
        return data.destroy();
    })
    .then(()=>{
        console.log('destroyed data');
        res.send('deleted successfully');
    })
    .catch((err)=>{
        console.log(err);
    })
    // res.send(`<h1>delete....</h1>`);
}


exports.updateData = (req, res, next) =>{
    const dataId = req.params.prodId;
    const {price, dish, tab } = req.body;

    Data.findByPk(dataId)
    .then((data =>{
        data.price= price,
        data.dish= dish,
        data.tab= tab

        return data.save();
    }))
    .then(()=>{
        res.send("updated successfully");
    })
    .catch((err)=>{
        console.log(err);
    })

    
}