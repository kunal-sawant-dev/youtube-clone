import nodemailer from "nodemailer";

const sendEmail = async (email,plan,price)=>{

const transporter = nodemailer.createTransport({

 service:"gmail",
 auth:{
   user:process.env.EMAIL,
   pass:process.env.EMAIL_PASSWORD
 }

});

await transporter.sendMail({

 from:"YouTube Clone",
 to:email,
 subject:"Plan Upgrade Successful",

 html:`
  <h2>Plan Upgrade Successful</h2>

  <p>Plan : ${plan}</p>
  <p>Amount : ₹${price}</p>

  <p>Thank you for upgrading!</p>
 `

});

};

export default sendEmail;