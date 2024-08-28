import express from 'express';
import sequelize from './config/database';
import imageRoutes from './routes/imageRoutes';

const app = express();

app.use(express.json());
app.use('/api', imageRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
