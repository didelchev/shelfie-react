import express from 'express';
import routes from './routes.js';
import mongoose from 'mongoose'
import 'dotenv/config'
import { authMiddleware } from './middlewares/auth-middleware.js';
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors());

app.use(express.json());

app.use(authMiddleware);


const dbUrl = process.env.MONGO_URI;

mongoose.connect(dbUrl, { dbName: 'shelfie'})
    .then(() => console.log('DB Connected !'))
    .catch((err) => console.log(`DB failed to connect: ${err} !`))


app.use(routes)

app.listen(PORT, () => {
    console.log('Server is working on http://localhost:5000...');
    
})