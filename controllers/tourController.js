const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  // const {
  //   body: { name, price },
  // } = req;
  // if (!name || !price) {
  //   return res.status(400).json({
  //     status: 'bad request',
  //     message: 'Missing name or price in request',
  //   });
  // }
  // next();
};

exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  // data: {
  //   tours,
  // },
  // });
};

exports.getTour = (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id == id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = (req, res) => {
  res.send('Done');
};

exports.patchTour = (req, res) => {
  const id = req.params.id * 1;
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Update tour here...',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'deleted',
    },
  });
};
