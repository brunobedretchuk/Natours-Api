const express = require('express');
require('dotenv').config()

const app = express();

app.get('/' , (req , res) => {
    res.status(404)
    .json({message : 'Hello from the server side!' , app : 'Natours'});
})

const port = process.env.port;
app.listen(port , () => {
    console.log(`App running on port ${port}`)
});