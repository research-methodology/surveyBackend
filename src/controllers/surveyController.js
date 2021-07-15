import {Survey} from './../database/schema/surveySchema'
class surveyController{
    static async createSurvey(req,res){
        try {
            // const userId = req.id;
            // const datas = req.body
            const data = {
                userId:"0ef0e9c67c3c8294058121889" ,
                surveyTitle:"imyitwarire",
                // categories: Survey.categories.push({
                //     categoryName:"ibyo ntazi"
                // })
                
                
                
                // category_schema.push({
                //     categoryName:"ibyo ntazi",
                //     questions: question_schema.push({
                //         question:"what is going on",
                //         wayOfAnswering: "radio",
                //         answers: answer_schema.push({
                //             answer:"me to i don't know"
                //         })
                //     })
                // })
            }
            const newSurvey = await Survey.create(data);
            await newSurvey.categories.push({
                categoryName:"ibyo ntazi sureba"
            })



            console.log('Survey Created ', newSurvey);
            res.status(201).json({
                status:201,
                message:"survey created sucessfull"
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status:500,
                message:"server Error"
            })
        }
    }
    static async getOneSurvey(req,res){
       await Survey.findById(req.params.id)
        .then(survey => {
            if(!survey) {
                return res.status(404).send({
                    message: `survey  with id  ${req.params.id} not found`
                });            
            }
            res.send(survey);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `survey not found with id ${req.params.id}`
                });                
            }
            return res.status(500).send({
                message: "Error retrieving survey with id " + req.params.id
            });
        });
    }
    static async getAllSurvey(req,res){
        try {
            const surveys = await Survey.find()
            if(surveys){
                res.status(201).json({
                    status:201,
                    message:"surveys are available",
                    data:surveys
                  })  
            }
            res.status(401).json({
                message:" surveys are not available",
                status:401
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status:500,
                message:"server Error"
            })
        }
    }
    static async updateSurvey(req,res){
    
        const surveyId = req.params.id;
        await Survey.findOneAndUpdate(surveyId,req.body,{new:true})
        .then(survey => {
            if(!survey) {
                return res.status(404).send({
                    message: `survey not found with id ${req.params.id}`
                });
            }
            res.send(survey)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `survey not found with id ${req.params.id}`
                });                
            }
            return res.status(500).send({
                status:500,
                message: `Error updating survey with id ${req.params.id}`
            });
        
        });   
    }

    static async deleteSurvey(req,res){
        Survey.findByIdAndRemove(req.params.id)
            .then(survey => {
                if(survey == null) {
                    return res.status(404).send({
                        message: "survey not found with id " + req.params.id
                    });
                }
            res.send({message: "Article deleted successfully!"});
            }).
            catch(err => {
                if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "survey not found with id " + req.params.id
                    });                
                }
                return res.status(500).send({
                    message: "Could not delete survey with id " + req.params.id
                });
            });
    }
    
}
export default surveyController