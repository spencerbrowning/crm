import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import routes from './src/routes/crmRoutes.ts';

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose connection
const dbName = 'CRMdb';
const connectionString = `mongodb+srv://Cluster34721:c3NLXUt7U2Z1@cluster34721.kyuuvzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster34721/${dbName}`;
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