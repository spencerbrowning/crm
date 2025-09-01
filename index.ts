import express from 'express';
import routes from './src/routes/crmRoutes.ts';

const app = express();
const PORT = process.env.PORT || 3000;

routes(app);

app.get('/', (req, res) => {
  res.send(`Node and express server is running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});