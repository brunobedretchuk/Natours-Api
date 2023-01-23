const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app.js');
const port = process.env.port;

const db = mongoose.connection;
const host = process.env.uri;
const dbupdate = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(host, dbupdate);
db.on('error', (err) => console.log('Error, DB not connected'));
db.on('connected', () => console.log('Connected to mongo!'));
db.on('disconnected', () => console.log('Mongo has disconnected'));
db.on('open', (err) => console.log('Conection made!'));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
