# surveyBackend
Backend of project of research methodology
 
# Technologies used
- Node js
- Express framework
- MongoDb 
- Mongoose for ORM
# EndPoints
## User
- `/api/v1/user/signup` for signup(`POST`)
- `/api/v1/user/verification/:token`  for signup(`PUT`)
- `/api/v1/user/login` for Login(`POST`)
- `/api/v1/user/profile` for viewing profile(`Get`)
- `/api/v1/user/logout`  for Logout (`POST`)
## survey
- `/api/v1/surveys/create` for creating survey (`POST`)
- `/api/v1/surveys/all` for viewing viewing all surveys created (`GET`)
- `/api/v1/surveys/:id/questions` for viewing viewing all questions of selected survey (`GET`)
- `/api/v1/surveys/:id` for viewing only one survey (`GET`)
- `/api/v1/surveys/update/:id` for update survey(`PUT`)
- `/api/v1/surveys/delete/:id` for delete survey(`DELETE`)
# How you can test it

- Clone this repository if you don't have
- RUN CMD `npm install` to install all required dependences
- Run CMD `npm run dev` for Deevelopment 
- Run CMD `npm run start` for Deployment
- type/copy in your browser ` https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4M53SOejDQbPl-7Fim2YAdoGCgroeuzs4SyI7XBKEeyphNErP5YowKaEiwxw1EygZF-UjC91kpE8SWOPska2TrzgsZDFg` and allow Less app inorder to be able to send emails
- check `.env.example` file create `.env` file and copy from `.env.example` and paste in `.env` file and fill required information