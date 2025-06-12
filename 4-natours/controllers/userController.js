const fs = require('fs');
const usersData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.checkUserId = (req, res, next, val) => {
  const id = usersData.find(el => el._id === id)
    if (!id) {
      return res.status(404).json({
        status: 'error',
        message: 'Id not found, please check if the user exists.'
      })
    }
    next();
  }

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: usersData.length, //include the number of results
    data: {
      users: usersData,
    },
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  const user = usersData.find(el => el._id === id);
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      user: usersData.find(el => el._id === id)
    },
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet',
  });
};

