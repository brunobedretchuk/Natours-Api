const fs = require('fs');
const express = require('express');
require('dotenv').config()
const port = process.env.port;
const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


app.get('/api/v1/tours' , (req , res) => {
       res.status(200)
       .json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
       })
})





// app.get('/' , (req , res) => {
//     res.status(404)
//     .json({message : 'Hello from the server side!' , app : 'Natours'});
// })

app.listen(port , () => {
    console.log(`App running on port ${port}`)
});