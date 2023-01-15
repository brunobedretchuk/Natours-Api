const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const app = require('./app.js')
const port = process.env.port;


app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });