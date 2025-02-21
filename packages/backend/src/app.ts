import express from 'express';
import { createRouter } from './routes/router';

const app = express();
app.use(express.json());
app.use('/api', createRouter());

export default app;