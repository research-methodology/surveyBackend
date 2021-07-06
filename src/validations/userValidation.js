import Joi from "joi";

export default class userValidations {

  static signUp(req, res, next) {
    const userValidationSchema = Joi.object({
        first_name: Joi.string().min(3).max(20).required(),
        last_name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        confirm_password: Joi.string().valid(Joi.ref("password")).required(),
      });
      const authError = userValidationSchema.validate(req.body);
      if (authError.error) {
        return res
          .status(400)
          .json({ error: authError.error.details[0].message.replace(/"/g, '') });
      }
      return next();
    }

    static login (req, res, next){
        const login = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required().min(5),
        });
        const { error } = login.validate(req.body);
        if (error) {
            return res.status(400).json({
            status: 400,
            message: error.details[0].message.replace(/"/g, ''),
            });
        }
        next();
    };  

}