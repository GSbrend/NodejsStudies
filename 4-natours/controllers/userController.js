const fs = require('fs');
const usersData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.checkUserId = (req, res, next, val) => {
    console.log(`user ID is: ${val}`);
    if (!req.body.id * 1 != usersData.body.id){
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
  const id = req.params.id * 1; // Converte o id para número
  const user = usersData.find(el => el.id ===id);
  res.status(200).json({
    status: 'success',
    data: {
      user
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

