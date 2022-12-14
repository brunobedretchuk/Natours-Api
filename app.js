const fs = require('fs');
const express = require('express');
require('dotenv').config();
const port = process.env.port;
const app = express();
const morgan = require('morgan');

// Middleware

app.use(morgan('dev'));
app.use(express.json());
app.use((req , res , next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

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

const getAllUsers = (req , res) => {
  res.status(500).json({
    status: "error",
    message: "Route is not yet defined"
  });
}

const getUser = (req , res) => {
  res.status(500).json({
    status: "error",
    message: "Route is not yet defined"
  });
}

const createUser = (req , res) => {
  res.status(500).json({
    status: "error",
    message: "Route is not yet defined"
  });
}

const updateUser = (req , res) => {
  res.status(500).json({
    status: "error",
    message: "Route is not yet defined"
  });
}

const deleteUser = (req , res) => {
  res.status(500).json({
    status: "error",
    message: "Route is not yet defined"
  });
}
  


  
  // Routes

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
.route('/')
.get(getAllTours)
.post(createTour);
  
tourRouter
.route('/:id')
.get(getTour)
.patch(patchTour)
.delete(deleteTour);

userRouter
.route('/')
.get(getAllUsers)
.post(createUser);

userRouter
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

app.use('/api/v1/tours' , tourRouter);
app.use('/api/v1/users' , userRouter);

// Start server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
