import express from 'express'
import surveyController from '../controllers/surveyController'
import checkers from '../middlewares/checker'

const route = express.Router();
route.post('/create', checkers.isLoggedIn,surveyController.createSurvey);
route.get('/all',surveyController.getAllSurvey)
route.get('/:id',surveyController.getOneSurvey)
route.get('/:id/questions',surveyController.getSurveyQuestions)
route.put('/update/:id',surveyController.updateSurvey)
route.delete('/delete/:id',surveyController.deleteSurvey)

export default route;