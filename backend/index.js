const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/databaseConnection'); 
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); 


app.get('/', (req, res) => {
  res.send(' Server is running successfully on port ' + process.env.PORT);
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
