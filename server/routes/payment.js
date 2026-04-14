import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import plans from "../config/plans.js";

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

router.post("/create-order", async (req,res)=>{

  const { plan } = req.body;

  const selectedPlan = plans[plan];

  const order = await razorpay.orders.create({
    amount:selectedPlan.price,
    currency:"INR"
  });

  res.json(order);

});

export default router;