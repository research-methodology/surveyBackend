import express from 'express'
import surveyController from '../controllers/surveyController'
import checkers from '../middlewares/checker'

const route = express.Router();
route.post('/create',checkers.verifyToken,checkers.isLoggedIn,surveyController.createSurvey);
route.get('/all',surveyController.getAllSurvey)
route.get('/:id',surveyController.getOneSurvey)
route.get('/:id/questions',surveyController.getSurveyQuestions)
route.get('/user/surveys',checkers.isLoggedIn,surveyController.getUserSurvey)
route.put('/update/:id',surveyController.updateSurvey)
route.put(`/answers/:id`,surveyController.saveUnswers)
route.delete('/delete/:id',surveyController.deleteSurvey)
export default route;
