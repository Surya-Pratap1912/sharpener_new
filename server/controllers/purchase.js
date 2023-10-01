const Razorpay = require("razorpay");
const Order = require("../models/orders");
const user = require("../models/users");


// console.log("proc is >  ",process.env.RAZORPAY_KEY_ID);
const purchasepremium = async (req, res) => {
  // console.log("prchase > user  >>  ", req.user);
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const amount = 2500;

    rzp.orders.create({ amount: 2500, currency: "INR" }, async (err, order) => {
      if (err) {
        console.log("purchase.js error 1 >>   ", err);
        throw new Error(JSON.stringify(err));
      }

      await req.user.createOrder({
        orderId: order.id,
        status: "pending",
      });

      // console.log("order    >>    ", result, rzp.key_id);
      return res.status(201).json({ order, key_id: rzp.key_id });
    });
  } catch (err) {
    console.log("purchase.js error 2 ",err);
    res.status(500).json({ message: "something went wrong in purchase.js", error: err });
  }
};

const updatetransectionstatus = async (req, res, next) => {
  const userId = req.user.id;
  try {
    console.log("in updt")
    console.log("in updt")
    console.log("in updt")
    console.log("in updt")
    const { payment_id, order_id, status } = req.body;
    console.log("requested body:",req.body);
    console.log("requested body:", payment_id , order_id, status);

    const order = await Order.findOne({ where: { orderId: order_id } });
    console.log("prints the order here", order);
    if (status === "failed") {
      const promise11 = order.update({
        paymentId: payment_id,
        status: "Failed",
      });
      const promise22 = req.user.update({ ispremiumuser: false });
      Promise.all([promise11, promise22]).then(() => {
        return res
          .status(400)
          .json({ success: false, message: "transection failed" });
      });
    } else {
      const promise1 = order.update({
        paymentId: payment_id,
        status: status,
      });
      const promise2 = req.user.update({ ispremiumuser: true });
      Promise.all([promise1, promise2])
        .then(() => {
          return res.status(202).json({
            success: true,
            message: "Transaction Successful",
            // token: singingup.generateAccesstoken(userId, true),
          });
        })
        .catch((err) => {
          console.log("err in puchase update 1", err);
          throw new Error(err);
        });
    }
  } catch (err) {
    console.log("err in puchase update 2 ", err);
    // console.log(err.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  purchasePremium: purchasepremium,
  updatetransectionstatus: updatetransectionstatus,
};
