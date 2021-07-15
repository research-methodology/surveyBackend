import bcrypt, { hash } from "bcryptjs";
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
              url:url
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
                res.send({
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
              error: "Internal server error!",
            });
        }
    
      }
    
    static async login(req,res){
        const email =req.body.email;
        const password = req.body.password;
            const user=await User.findOne({email}).select('+password');  
            if(!user || !bcrypt.compareSync(password, user.password)){
                return res.status(400).send({
                    message:"Password OR username is invalid!"
                  });
                };
            await User.findByIdAndUpdate(
                { _id:user._id },
                { isLoggedIn: true },
                function(err, result) {
                  if (err) {
                    res.send(err);
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
            message: "user data received",
            data:result
          })
        })
      } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Internal server error!'});
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
                    res.send(err);
                  } else {
                    res.status(201).json({
                        status:'success',
                        message:'Logout successful',
                    })
                  }
                }
              );
            
        } catch (error) {
           // console.log(error)
            return res.status(500).json({error: 'Internal server error!'});
        }
    }
}
export default UserControllers;