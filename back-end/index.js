const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_URL = `mongodb+srv://sadik1998:${DB_PASSWORD}@uberclonedb.l7nsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const DB_URL = 'mongodb://localhost:27017/UberCloneDB';

// Connecting to the database
mongoose.connect(DB_URL, {}, (err) => {
  if (err) console.log('there was an error white connecting to database!');
  else console.log('database connected.');
});

// Importing routers
const oauthRouter = require('./routers/oauth.router.js');
const authenticationRouter = require('./routers/authentication.router.js');
const userRouter = require('./routers/user.router.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Using the necessary midllewares
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'This the UberClone api home endpoint',
  });
});

// Adding routers to the app
app.use('/oauth', oauthRouter);
app.use('/auth', authenticationRouter);
app.use('/user', userRouter);

// Not Found 404
app.use((err, req, res, next) => {
  res.status(404);

  res.send({
    message: 'Not Found 404!',
  });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
