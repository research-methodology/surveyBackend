# surveyBackend
Backend of project of research methodology
 
# Technologies used
- Node js
- Express framework
- MongoDb 
- Mongoose for ORM

# 

| HTTP Method | Endpoint                      | Description                                    |
| :---------- | :---------------------------- | :--------------------------------------------- |
| **USER** |
| POST        | `/api/v1/user/signup`         | allows the user to create an account           |
| PUT         | `/api/v1/user/verification/:token`      | allows the user to verify his/her an account           |
| POST        | `/api/v1/user/login`               | allows the user to login into his/her account           |
| GET         | `/api/v1/user/profile`                  | allows the user to view his/her account           |
| POST        | `/api/v1/user/logout`                  | allows the user to logout from account           |
| POST        | `/api/v1/user/feedback`                | allows the user to send his/her feedback           |
| ****SURVEY**** |
| POST       | `/api/v1/surveys/create` | creating survey |
| GET        | `/api/v1/surveys/all` | viewing viewing all surveys created |
| GET        | `/api/v1/surveys/:id` | viewing only one survey  |
| GET        | `/api/v1/surveys/:id/questions` | viewing viewing all questions of selected survey |
| GET        | `/api/v1/surveys/user/surveys` | viewing user's surveys  |
| PUT        | `/api/v1/surveys/update/:id` | update survey |
| PUT        | `/api/v1/surveys/answers/:id` | saving answers of certain survey |
| DELETE       | `/api/v1/surveys/delete/:id` | delete survey |

# How you can test it

- Clone this repository if you don't have
- RUN CMD `npm install` to install all required dependences
- Run CMD `npm run dev` for Deevelopment 
- Run CMD `npm run start` for Deployment
- type/copy in your browser ` https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4M53SOejDQbPl-7Fim2YAdoGCgroeuzs4SyI7XBKEeyphNErP5YowKaEiwxw1EygZF-UjC91kpE8SWOPska2TrzgsZDFg` and allow Less app inorder to be able to send emails
- check `.env.example` file create `.env` file and copy from `.env.example` and paste in `.env` file and fill required information