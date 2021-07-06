import { string } from "joi";

const mongoose = require("../config/dbconfig");
const Schema = mongoose.Schema;

const answer_schema = new Schema(
    {
      answer:{
           type: String
       } 
    },{
      versionKey: false,
      timestamps: true
    }
  );
const question_schema = new Schema(
    {
       question:{
           type: String
       },
       wayOfAnswering:{
           type: String
       },
       answers:[answer_schema]

    },{
      versionKey: false,
      timestamps: true
    }
  );
const category_schema = new Schema(
    {
        categoryName:{
            type: String
        },
        questions:[question_schema],


    },{
      versionKey: false,
      timestamps: true
    }
  );
 
  const rs_schema = new Schema(
    {
        question:{type:String},
        answer:[String]
    },{
      versionKey: false,
      timestamps: true
    }
  );
  const survey_schema = new Schema(
  {
      userId:{
        type:String
      },
      surveyTitle:{
        type:String
      },
      categories:[category_schema],
      results:[[rs_schema]]

  },{
    versionKey: false,
    timestamps: true
  }
);

export const Survey = mongoose.model("Surveys", survey_schema);
