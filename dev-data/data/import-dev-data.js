const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const fs = require('fs');
const Tour = require('../../models/tourModel');

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
} catch (err) {
    console.log(err);
}
process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
} catch (err) {
    console.log(err);
}
process.exit();
};

if(process.argv[2] === '--import'){
    importData();
} else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv);
