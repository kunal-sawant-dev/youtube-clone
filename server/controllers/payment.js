const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "RAZORPAY_TEST_KEY",
  key_secret: "RAZORPAY_SECRET"
});

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: 49900, // ₹499
      currency: "INR",
      receipt: "premium_upgrade"
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment error" });
  }
};