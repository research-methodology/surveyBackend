import { signinToken, decode } from "../utilities/jwt";
import { User } from "./../database/schema/user";
//const User = require("../database/schema/user")

class checkers{

    static async isLoggedIn(req,res,next){
        const auth = req.header('Authorization');
        if (!auth) return res.status(401).json({ message: 'Unauthorized, Login first'});
        const token = req.headers.authorization;        
        const id = decode(token).id;
        try{
            const frestUser= await User.findById(id);
            if(!frestUser.isLoggedIn) {
                return res.status(401).json({ message: "User already logged out, Please Login and try again!" });
            }
            req.id = id;
            next();    
        }
        catch(err){
            res.status(401).json({
                status:401,
                message:'invalid token,login to get one'
            })
        }             
    }

    static async isExist(req,res,next){
        try {
            const {email}= req.body
            const user= await User.findOne({email})
            if(user){
                return res.status(402).send({
                    message:"this email is already in use"
                })
            }
            next();
            
        } catch (error) {
            console.log(error)
        }
    }
    static async isUserFound (req,res,next){
        try {
            const {email}= req.body
            const user= await User.findOne({email})
            console.log(user)
            if(!user){
                return res.status(402).send({
                    message:"we don't have this user in our system"
                })
            }
            next();
           
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal Error!" });
        }
    }

    static async isVerified(req,res,next){
        try {
            const {email} = req.body;
            const user =await User.findOne({email});
            if(!user.isConfirmed){
                return res.status(402).send({
                    message:"Sir/Madam you have to check Our Email verification in your email",
                });
            }
            next();
        } catch (error) {
            return res.status(500).json({ message: "Internal Error!" }); 
        }
    }

    static verifyValidLink(req, res, next) {
        try {
            const { token } = req.params;
            const decodedToken = decode(token)
            req.id = decodedToken.id;
            return next();
        } catch (err) {
        console.log(err)
        if (err.message === "jwt malformed"|| err.message === "jwt must be provided" || err.message === "invalid token" || err.message === "jwt expired") {
            return res
            .status(401)
            .json({ message: "You are using Incorrect or Expired Link!" });
        }
        return res.status(500).json({ message: "Internal Error!" });
        }
    }


    static verifyToken(req, res, next) {
        try {
            const auth = req.header('Authorization');
            if (!auth) return res.status(401).json({ message: 'Unauthorized, Login first'});
            const token = req.headers.authorization; 
            const decodedToken = decode(token)
            return next();
        } catch (err) {
        if (err.message === "jwt malformed"|| err.message === "jwt must be provided" || err.message === "invalid token" || err.message === "jwt expired") {
            return res
            .status(400)
            .json({ message: "You are using Incorrect or Expired Link!" });
        }
        return res.status(500).json({ message: "Internal Error!" });
        }
    }
       
}
export default checkers
