require('dotenv').config();
const port = process.env.port;
const app = require('./app.js')

app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });