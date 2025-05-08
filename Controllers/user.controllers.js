import User from "../model/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
const registerUser = async (req, res) => {
  // get data
  //validate
  // check if user already exists
  // create a user in database
  //create a verification token
  // save token in database
  // send token as email to user
  // send success status to user

  const {name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are require",
    });
  }
  try {
    const user =await User.findOne({email});
    if (user) {
      return res.status(400).json({
        message: "user already existed",
      });
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });


    if (!newUser) {
      return res.status(400).json({
        message: "User not created",
      });
    }
    console.log(newUser);


    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    newUser.verificationToken = token;
    await newUser.save();

    // email
    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_EMAIL,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailoptions = {
      from:process.env.MAILTRAP_SENDEREMAIL,
      to: newUser.email,
      subject: "Hello ✔", // Subject line
      text:`Click on the following link: 
      ${process.env.BASE_URL}/api/v1/user/verify/${token}`,
    };
    transport.sendMail(mailoptions)
    

    return res.status(201).json({
      message:"user regestered successfully",
      success: true,
    
  })

  } catch (error) {
    console.log(error);
    
    res.status(400).json({
      message:"user is not registred",
      error,
      success: false,
    })
  }
};
const verifyUser= async (req,res)=>{
  //get token from url
  //validate
  // find user based on token
  //if not
  // set isVerified field to true
  // remove verification token
  // save
  //return response
  const {token}=req.params;
  console.log(token);
  if(!token){
    return res.status.json({
      message:"Token is invalid",
    })
  }
  const user = await User.findOne({verificationToken:token})
  if(!user){
    return res.status.json({
      message:"User do not exist!",
    })
  }
  user.isVerified=true;
  user.verificationToken=undefined;
  await user.save() 
}


export {registerUser,verifyUser};
