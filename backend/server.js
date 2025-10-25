const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/moviereview');


app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/reviews', require('./routes/reviews'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));