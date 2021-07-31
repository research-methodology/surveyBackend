import express from 'express'
import userValidations from '../validations/userValidation';
import UserControllers from '../controllers/userControllers'
import checker from '../middlewares/checker'

const app = express.Router();
app.post('/signup',userValidations.signUp,checker.isExist,UserControllers.signUp)
app.put("/verification/:token",checker.verifyValidLink,UserControllers.emailVerification);
app.post('/login',userValidations.login,checker.isUserFound,checker.isVerified,UserControllers.login);
app.get('/profile',checker.verifyToken,checker.isLoggedIn,UserControllers.profile);
app.post('/logout',checker.verifyToken,checker.isLoggedIn,UserControllers.logout);
app.post('/feedback',UserControllers.saveFeedBack);

export default app;