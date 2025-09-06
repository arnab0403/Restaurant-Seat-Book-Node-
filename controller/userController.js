const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jswonwebtoken=require("jsonwebtoken");
const util = require("util");

const promisify = util.promisify;
const jswtSign = promisify(jswonwebtoken.sign);
const jwtVerify = promisify(jswonwebtoken.verify);

const otpSend = require("../Mail/dynamicMail");
// password hashing 
async function hashPassword(password) {
  const saltRounds = 10; // higher = more secure, but slower
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}


// signup 
const signUp = async (req, res) =>{
    try {
        const user = req.body;

        // Error handle
        if (!user) {
            res.status(400).json(
                {
                    message:"User object needed",
                    status:"failed"
                }
            );
        }

        // creating and sending otp
        const otp = Math.floor(Math.random()*900000);
        await otpSend(user.email,user.name,otp);

        // attach the otp to the user
        user.otp = otp;

        // password hashing
        const password=user.password;
        const hashedPassword = await hashPassword(password);

        // attach the hashed password to the user
        user.password = hashedPassword;

        // insert the user to the DB
        const userRes = await UserModel.create(user);

        // sending Response
        res.status(202).json({
            message:"User created sucsessfully",
            status:"success",
            user:userRes
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}

// login 
const login =async (req,res)=>{
    try {
        const body = req.body;
        const {email,password} = body;
        console.log(email, password)
        if (!email || !password) {
           return res.status(401).json({
                message:"all fileds are required",
                status:"failed"
            })
        }

        const userRes =await UserModel.findOne({email});
        if (!userRes) {
            console.log("notfound");
            return res.status(404).json({
                message:"email or password wrong",
                status:"failed"
            })
        }
        const userPassword = userRes.password;

        const isVerified = await bcrypt.compare(password, userPassword);

        if (!isVerified) {
            return res.status(401).json({
                message:"email id or password is wrong",
                status:"failed"
            })
        }
        const token = await jswtSign({"id":userRes["_id"]},process.env.secrect_key);

        res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 *24,
        httpOnly:true, // it can only be accessed by the server
        });

        res.status(200).json({
            message:"user sucsessfully logged in",
            status:"success",
            user:userRes
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error",
            status:"failed"
        });
    }
}


const userDetailsByToken = async (req,res)=>{
    try {

        if (req.cookies && req.cookies?.jwt) {
            const jwtToken = req.cookies.jwt;
            const jwt = await jwtVerify(jwtToken,process.env.secrect_key);
            const id = jwt.id;
            const user =await UserModel.findById(id);
            res.status(200).json({
                message:"User find",
                status:"success",
                user:user
            })

        }else{
            console.log("no cookies are here");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error",
            status:"failed"
        });
    }
}


const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      path: "/"
    });
    res.status(200).json({
      message: "Logged out successfully",
      status: "success"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed"
    });
  }
};


const verifyOtp = async (req,res)=>{
    try {
        const {email,otp}=req.body;
        const userRes = await UserModel.findOne({email});
        const userOtp = userRes.otp;

        if (userOtp!==otp) {
            return res.status(404).json({
                message:"wrong otp",
                status:"failed"
            });
        }

        userRes.isVerified=true;
        userRes.otp=undefined;

        userRes.save();

        res.status(200).json({
            message:"otp confirmed",
            status:"success"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message: "Internal Server Error",
        status: "failed"
        });
    }
}

module.exports={signUp,login,userDetailsByToken,logout,verifyOtp};