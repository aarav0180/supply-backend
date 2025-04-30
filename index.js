const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//console.log("MongoDB URI:", process.env.DATABASE);


// Database setup
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => { console.log("✅ Connected to MongoDB")})
.catch(err => console.error("❌ MongoDB connection failed:", err));

// Routes Setup
app.use('/api/auth', require('./routes/auth'));
app.use('/api/project', require('./routes/project'));
app.use('/api/issue', require('./routes/issue'));

// Listen to Port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`🛡️ Auth server running at http://localhost:${port}`);
})