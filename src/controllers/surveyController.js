import {Survey} from './../database/schema/survey'
class surveyController{
    static async createSurvey(req,res){
       
        try {
            const data = req.body.categories;
            var url="";
            const dt = {
              userId: req.id,
              surveyTitle: req.body.surveyTitle,
              categories: [],
              results: [],
            };
      
           await Survey.create(dt)
              .then((res) => {
  
                data.forEach((category) => {
                  res.categories.push({
                    categoryName: category.categoryName,
                    questions: [],
                  });
      
                  const surveyId = res._id;
                  url = `https://cst-survey-frontend.herokuapp.com/respondent/${surveyId}`;

                  category.questions.forEach((question) => {
                    res.categories[res.categories.length - 1].questions.push({
                      question: question.question,
                      wayOfAnswering: question.wayOfAnswering,
                      answers: [],
                    });
      
                    question.answers.forEach((answer) => {
                      let leng = res.categories[res.categories.length - 1].questions.length;
                      res.categories[res.categories.length - 1].questions[ leng - 1 ].answers.push({
                        answer: answer,
                      });
                    });
                  });
                });
                res.save().then(rs =>{
                    //console.log("save success");
                })
              })
              .catch((err) => {
               // console.log(err.message);
              });
      
            res.status(201).json({
              status: 201,
              message: "survey created sucessfull",
              surveyURL:url
            });
      } catch (error) {
            console.log(error);
            res.status(500).send({
              status: 500,
              message: "server Error",
            });
          }
  }
  static async getOneSurvey(req, res) {
    await Survey.findById(req.params.id)
      .then((survey) => {
        if (!survey) {
          return res.status(404).send({
            message: `survey  with id  ${req.params.id} not found`,
          });
        }
        res.send(survey);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: `survey not found with id ${req.params.id}`,
          });
        }
        return res.status(500).send({
          message: "Error retrieving survey with id " + req.params.id,
        });
      });
  }

  static async getSurveyQuestions(req,res){
    await Survey.findById(req.params.id)
      .then((survey) => {
        if (survey == null) {
          return res.status(404).send({
            status:404,
            message: `survey  with id  ${req.params.id} not found`,
          });
        }
        const questions = {
          surveyTitle:survey.surveyTitle,
          categories: survey.categories
        }
        res.send({
          message: `Questions of survey number ${req.params.id}`,
          questions:questions
        });
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            status:"hello",
            message: `survey not found with id ${req.params.id}`,
          });
        }
        return res.status(500).send({
          message: "Error retrieving survey with id " + req.params.id,
        });
      });
  }

  static async getAllSurvey(req, res) {
    try {
      const surveys = await Survey.find();
      if(surveys.length == 0){
        res.status(404).json({
          message: " surveys are not available",
          status: 404,
        });
      }
        res.status(201).json({
          status: 201,
          message: "surveys are available",
          data: surveys,
        });
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: 500,
        message: "server Error",
      });
    }
  }
  static async updateSurvey(req, res) {
    const surveyId = req.params.id;
    await Survey.findOneAndUpdate(surveyId, req.body, { new: true })
      .then((survey) => {
        if (!survey) {
          return res.status(404).send({
            message: `survey not found with id ${req.params.id}`,
          });
        }
        res.send(survey);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: `survey not found with id ${req.params.id}`,
          });
        }
        return res.status(500).send({
          status: 500,
          message: `Error updating survey with id ${req.params.id}`,
        });
      });
  }

  static async deleteSurvey(req, res) {
    Survey.findByIdAndRemove(req.params.id)
      .then((survey) => {
        if (survey == null) {
          return res.status(404).send({
            message: "survey not found with id " + req.params.id,
          });
        }
        res.send({ message: "Article deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "survey not found with id " + req.params.id,
          });
        }
        return res.status(500).send({
          message: "Could not delete survey with id " + req.params.id,
        });
      });
  }
}
export default surveyController;
