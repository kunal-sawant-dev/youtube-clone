const Video = require("../Modals/video");
const User = require("../Modals/Auth");

exports.downloadVideo = async (req,res) => {

 const user = await User.findById(req.userId);
 const video = await Video.findById(req.params.id);

 if(user.plan === "free" && user.downloadCount >= 1){
   return res.json({
     message:"Upgrade to premium to download more videos"
   });
 }

 user.downloadCount += 1;
 await user.save();

 res.json({
   url:`/uploads/${video.file}`
 });

};