import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import routes from './src/routes/crmRoutes.ts';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// mongoose connection
const { MONGODB_ATLAS_DB_NAME: dbName, MONGODB_ATLAS_DB_CONNECTION_STRING: connString } = process.env;

if (!dbName || !connString) {
  throw new Error('Missing required MongoDB environment variables');
}

const connectionString = `${connString}/${dbName}`;
mongoose.Promise = global.Promise;
mongoose.connect(connectionString, {
    dbName: dbName,
    serverSelectionTimeoutMS: 5000,
    family: 4
}).then(() => {
    console.log('Connected to MongoDB Atlas successfully');
}).catch((err) => {
    console.error('MongoDB Atlas connection error:', err);
});

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) => {
  res.send(`Node and express server is running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});