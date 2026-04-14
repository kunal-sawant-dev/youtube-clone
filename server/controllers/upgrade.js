import User from "../Modals/Auth.js";
import plans from "../config/plans.js";
import sendEmail from "../utils/sendEmail.js";

export const upgradePlan = async (req,res)=>{

 const { userId, plan } = req.body;

 const selectedPlan = plans[plan];

 await sendEmail(user.email,plan,selectedPlan.price/100);

 await User.findByIdAndUpdate(userId,{
   plan:plan,
   watchLimit:selectedPlan.watchLimit
 });

 res.json({
   message:"Plan upgraded successfully"
 });

};