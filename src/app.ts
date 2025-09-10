import express from 'express';
import cors from "cors";
import config from "./config/config"
import routes from './routes/routes';
import { schemaErrorHandler, errorHandler } from './middleware/errorHandler';
import logger from "./logger"

const app = express();
if(config.corsOrigin){
    app.use(cors({origin: config.corsOrigin}));
}
else{
    app.use(cors());
}

const msg = "SBS Affordability Calculator Backend is running";

logger.info(msg);

app.use(express.json());

app.get('/', (req, res) =>{
    res.send(msg);
})
app.use('/', routes);

app.use(schemaErrorHandler);

app.use(errorHandler);

export default app;
