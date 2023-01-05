const fs = require('fs');
const express = require('express');
require('dotenv').config();
const port = process.env.port;
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id == id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  console.log(tours);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body)

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );

  res.send('Done');
};

const patchTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id == id);
  
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
  
    console.log(tours);
    res.status(200).json({
      status: 'success',
      data: {
        tour: 'updated',
      },
    });
  }

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id == id);
  
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
  
    console.log(tours);
    res.status(200).json({
      status: 'success',
      data: {
        tour: 'deleted',
      },
    });
  }
  
app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);
  
app.route('/api/v1/tours')
.get(getTour)
.patch(patchTour)
.delete(deleteTour);


app.listen(port, () => {
  console.log(`App running on port ${port}`);
});