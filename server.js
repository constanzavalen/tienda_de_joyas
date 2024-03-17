import express from 'express';
import cors from 'cors';
import {logger} from 'logger-express';
import joyasRoutes from './routes/joyas.routes.js';

import dotenv from 'dotenv';
dotenv.config;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger());

app.use('/api/v1', joyasRoutes);

app.listen(PORT, () => {
    console.log(`server on  http://localhost:${PORT}`);
});

