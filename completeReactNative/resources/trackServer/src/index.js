const mongoose = require('mongoose');
require('./models/User');

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  'mongodb+srv://admin:passwordpassword@cluster0.0sopk.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () =>
  console.log('Connected to mongo instance')
);
mongoose.connection.on('error', err =>
  console.error('Error connecting to mongo', err)
);

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email is: ${req.user.email}`);
});

app.listen(3000, () => console.log('Listening on port 3000...'));
