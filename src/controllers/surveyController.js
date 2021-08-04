import {Survey} from './../database/schema/survey'
class surveyController{

  static async createSurvey(req,res){
    const data = req.body.categories
    var url="";
    var surveyId="" ;
    const initialData = {
      surveyTitle: req.body.surveyTitle,
      results:[]
    }
    await Survey.create(initialData)
      .then((response) => {
        surveyId = response._id;
        response.userId = req.id;

        data.forEach((category) => {
         //insering categoryname 
          response.categories.push({
            categoryName: category.categoryName,
            questions: [],
          });
​
          category.questions.forEach(async(question) => {
          //each category from frontend
          const respCatLength= response.categories.length;
          let firstLength = respCatLength;
             response.categories[firstLength - 1].questions.push({
              question: question.question,
              wayOfAnswering: question.wayOfAnswering,
              answers: [],
            });
​
        
          question.answers.forEach((answer) => {
              //console.log(answer);
              let cateLeng = respCatLength;
              let leng =response.categories[cateLeng - 1].questions.length;
              response.categories[cateLeng-1].questions[ leng - 1 ].answers.push({
                  answer:answer.answer
                });
            });  
      ​
          });   
​
        });

        response.save().then((resp)=>{
          url = `https://cst-survey-frontend.herokuapp.com/respondent/${surveyId}`;
          return res.status(201).json({
            status: 201,
            message: "survey created sucessfull !!!!!",
            surveyURL:url,
            response:resp
          });
        }).catch((error)=>{
          res.status(403).json({
            status:403,
            message:'fail to save survey',
            errorMessage:error.message
          })
        })
        
      })
      .catch((err) => {
        //console.log(error);
        return res.status(500).send({
          status: 500,
          errorMessage: err.message,
          message: "server Error",
        });
      });
}
​
static async getOneSurvey(req, res) {
  await Survey.findById(req.params.id)
    .then((survey) => {
      if (survey == null) {
        return res.status(404).send({
          status:404,
          message: `survey  with id  ${req.params.id} not found`,
        });
      }
      return res.status(200).json({
        status:200,
        survey:survey
      })
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          status:404,
          message: `survey not found with id ${req.params.id} !!`,
        });
      }
      return res.status(500).send({
        status:500,
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
      return res.status(200).json({
        status:200,
        message: `Questions of survey number ${req.params.id}`,
        questions:questions
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          status:404,
          message: `survey not found with id ${req.params.id}`,
        });
      }
      return res.status(500).send({
        status:500,
        message: "Error retrieving survey with id " + req.params.id,
      });
    });
}

static async getAllSurvey(req, res) {
  try {
    const surveys = await Survey.find();
    if(surveys.length == 0){
      res.status(404).json({
        status: 404,
        message: " surveys are not available"
      });
    }
      res.status(200).json({
        status: 200,
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

static async getUserSurvey(req,res){
  await Survey.find({userId:req.id})
    .then((surveys) => {
      if (surveys.length == 0) {
        return res.status(404).send({
          status:404,
          message: `User with id  ${req.id} has no surveys`,
        });
      }
      return res.status(200).json({
        status:200,
        surveys:surveys
      })
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          status:404,
          message: `User with id  ${req.id} has no surveys`,
        });
      }
      return res.status(500).send({
        status:500,
        message: "Server error happen when retrieving surveys",
      });
    });
}

static async saveUnswers(req,res){
  await Survey.findById(req.params.id).then((survey)=>{
    const newAnswers = req.body;
    // const xyz = [ 
    //   {
    //     question:"hello1",
    //     answer:["hezz1"]
    //   },
    //   {
    //     question:"hello2",
    //     answer:["hezz2"]
    //   }
    // ]
    survey.results.push(newAnswers)
    survey.save();
    return res.status(201).json({
      status:201,
      message: "survey updated sucessfull",
      survey:survey
    })
    
  }).catch((error)=>{
    //console.log("Gerroor", error)
    return res.status(500).json({
      status:500,
      message:"server error"
    })
  })
}

static async updateSurvey(req, res) {
  await Survey.findByIdAndUpdate({
    _id: req.params.id
      }, req.body , { upsert: true,returnNewDocument: true  }).then(
          (resp=>{
            return res.status(200).json({
              status:200,
              message:"survey updated successfully",
              survey:resp
            })
          })
        ).catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              status:404,
              message: `survey with id ${req.params.id} not found`,
            });
          }
          return res.status(500).send({
            status: 500,
            message: `Error occur during updating survey with id ${req.params.id}`,
          });
        });

}

static async deleteSurvey(req, res) {
  Survey.findByIdAndRemove(req.params.id)
    .then((survey) => {
      if (survey == null) {
        return res.status(404).send({
          status:404,
          message: "survey not found with id " + req.params.id,
        });
      }
      return res.status(200).json({
        status:200,
        message: "Article deleted successfully!"
      })
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          status:404,
          message: "survey not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        status:500,
        message: "Could not delete survey with id " + req.params.id,
      });
    });
  }

}
export default surveyController;
