import bodyParser from 'body-parser';
import express from 'express';

import accessEnv from '#root/helpers/accessEnv';
import registerRoutes from "#root/server/routes";

const PORT = accessEnv('PORT', 5000);

const app = express();

app.use(bodyParser.json());

registerRoutes(app);

app.listen(PORT, '0.0.0.0', () => {
    console.info(`Server is listening on port ${PORT}`);
})
