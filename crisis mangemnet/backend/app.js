const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const indexrouter = require('./routes/index')

const app = express();

const db = require('./config/mongooseconnect');
app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../backend/public/index.html'));
});

const authroutes = require('./routes/authroutes')
console.log(authroutes);
  app.use('/',indexrouter)


app.use('/auth', authroutes);

const hospitalroutes = require('./routes/hospitalroutes');
app.use('/hospitals', hospitalroutes);

const incidentRoutes = require('./routes/incidentroute');
app.use('/incident', incidentRoutes);

const isloggedin = require('./middlewares/isloggedin');
app.get('/dashboard', isloggedin, (req, res) => {
  res.json({
    message: 'Crisis Management Dashboard',
    user: req.user,
  });
});

app.get('/api/management', isloggedin, (req, res) => {
  res.json({
    message: 'Management Network Data',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Crisis Management System API running on port ${PORT}`);
});


