const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jswonwebtoken=require("jsonwebtoken");
const util = require("util");

const promisify = util.promisify;
const jswtSign = promisify(jswonwebtoken.sign);

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

        if (!user) {
            res.status(400).json(
                {
                    message:"User object needed",
                    status:"failed"
                }
            );
        }

        

        const password=user.password;
        const hashedPassword = await hashPassword(password);

        user.password = hashedPassword;

        const userRes = await UserModel.create(user);
        
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

        if (!email || !password) {
           return res.status(401).json({
                message:"all fileds are required",
                status:"failed"
            })
        }

        const userRes =await UserModel.findOne({email});
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
            status:"successfull",
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

module.exports={signUp,login};