import app from './app';
import config from './config/config';
import dotenv from "dotenv"

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`, '<<<---');
});
