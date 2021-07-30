import bcrypt, { hash } from "bcryptjs";
import emailMocks from "../utilities/emailMocks";
import { signinToken, decode } from "../utilities/jwt";
import { sendEmail } from "../utilities/sendMail";
import { User } from "./../database/schema/user";

class UserControllers {
    static async signUp(req,res) {
        try{ 
            const cipher = bcrypt.hashSync(req.body.password, 10);
            const newUser=await User.create({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                password:cipher,
            });
            const emailVerificationToken = signinToken({ id: newUser._id, email: newUser.email})
            const url=`/verification/${emailVerificationToken}`
            const options ={
              email:req.body.email,
              subject: "your are receiving this email because you signup on our system",
              message: await emailMocks.signUp(url),
            }
           await sendEmail(options);
            newUser.password = undefined;
            res.status(201).json({
                status:'success',
                data:newUser
            })
           }
           catch(err){
            console.log(err);
            res.status(404).json({
                status:404,
                message:"regitration fails"
            })
          }
        
      };
      static async emailVerification(req, res) {
        try {
          await User.findByIdAndUpdate(
            { _id:req.id },
            { isConfirmed: true },
            function(err, result) {
              if (err) {
                console.log(err)
                res.status(403).json({
                  status:403,
                  message:"Confirmesion went wrong"
                });
              } else {
                return res.status(200).json({
                  status: 200,
                  Message: "User confirmed Successfully!",
                });
              }
            }
          );
        } catch (error) {
            res.status(500).json({
              status: 500,
              message: "Internal server error!",
            });
        }
    
      }
    
    static async login(req,res){
        const email =req.body.email;
        const password = req.body.password;
            const user=await User.findOne({email}).select('+password');  
            if(user == null || !bcrypt.compareSync(password, user.password)){
                return res.status(400).json({
                    status:400,
                    message:"Password OR username is invalid!"
                  });
                };
            await User.findByIdAndUpdate(
                { _id:user._id },
                { isLoggedIn: true },
                function(err, result) {
                  if (err) {
                    res.status(401).json({
                      status:401,
                      message:err.message
                    });
                  } else {
                   //sending token
                    const token=signinToken({ id: result._id, email: result.email});
                    //console.log(result);
                    res.status(201).json({
                        status:201,
                        message:'The email and password valid,Logged In',
                        token,
                    })
                  }
                }
              );
            
    }
    
    static async profile(req,res){
      try {
        //const id = req.id;
        await User.findById(req.id).then(result=>{
          res.status(201).json({
            status:201,
            message: "user data received",
            data:result
          })
        })
      } catch (error) {
        console.log(error)
        return res.status(500).json({
          status:500,
          message: 'Internal server error!'
        });
      }
    }
    static async logout(req, res) {
        try {
            const userId = req.id;
            await User.findByIdAndUpdate(
                { _id:userId },
                { isLoggedIn: false },
                function(err, result) {
                  if (err) {
                    res.status(401).json({
                      status:401,
                      message:err.message
                    });
                  } else {
                    res.status(201).json({
                        status:201,
                        message:'Logout successful',
                    })
                  }
                }
              );
            
        } catch (error) {
           // console.log(error)
            return res.status(500).json({
              status:500,
              message: 'Internal server error!'
            });
        }
    }
}
export default UserControllers;