import connectDB from './config/db.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/Transactions.route.js';
import authrouter from './routes/auth.router.js'
import auth from './middleware/auth.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});


app.use('/api/transactions',router)
app.use('/api/auth',authrouter)


connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});