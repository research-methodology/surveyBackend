import express from 'express'
import swaggerUi from 'swagger-ui-express'
import Routes from './userRouters'
const swaggerDocument = require("../documentation/swagger.json");

const router = express();


router
    .get('/', (req, res) => {
        res.status(200).json({
            message: 'welcome to survey backend'
        })
    })
    .use('/api/v1/user',Routes)
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
   export default router;
