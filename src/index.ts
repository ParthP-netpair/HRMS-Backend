import mongoose from 'mongoose';
import getEnv from './config/env.config';
import app from './config/server.config';
import logger from './helpers/logger';


(async () => {
  try {
    const port = Number(getEnv('PORT'));
    const mongoUri = getEnv('MONGO_URL');
    await mongoose.connect(mongoUri);
    console.log(`Database connected`);
    const server = app.listen(port, () => console.log(`Server running at port ${port}`));
    process.on('SIGINT', () => {
      console.log('Shutting down server...');
      server.close(() => {
        console.log('Server stopped');
        process.exit(0);
      });
    });
    
  } catch (error) {
    logger.error('Error while starting server: ' + error?.message, { data: error, log: 'error' });
    process.exit(1);
  }
})();
