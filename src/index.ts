import express from 'express';
import dotenv from 'dotenv';
import {json, urlencoded} from 'body-parser';

import blogRoutes from './routes/blog';
import userRoutes from './routes/user';
import {assertDatabaseConnection} from './database';

dotenv.config();

const app = express();

app.use(json())
app.use(urlencoded({extended:true}))

app.use('/blog', blogRoutes)
app.use('/user', userRoutes)

const startServer = async () => {
  try {
    await assertDatabaseConnection();
    
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
};

if(process.env.NODE_ENV != 'test') startServer();

export default app;
