const userRepository = require("../repository/userRepository");
const helper = require("../helper")

module.exports = {
  getUser(req, res) {
    userRepository.find().then((result) => {
      res.status(200).send({
        error: false,
        message: "Get all user",
        result,
      });
    });
  },

  getUserByAccountNumber(req, res) {
    userRepository
      .findByAccountNumber(req.params.accountNumber)
      .then((result) => {
        res.status(200).send({
          error: false,
          message: "Get all user",
          result,
        });
      });
  },

  getUserByIdentityNumber(req, res) {
    userRepository
      .findByIdentityNumber(req.params.identityNumber)
      .then((result) => {
        res.status(200).send({
          error: false,
          message: "Get all user",
          result,
        });
      });
  },

  createUser(req, res) {
    let userName = req.body.userName;
    let accountNumber = req.body.accountNumber;
    let emailAddress = req.body.emailAddress;
    let identityNumber = req.body.identityNumber;

    if (!helper.isEmail(emailAddress)){
      res.status(401).send({
        error: true,
        message: "Email not valid",
      });
      return
    }

    userRepository
      .create(userName, accountNumber, emailAddress, identityNumber)
      .then((result) => {
        if (result._id != null) {
          res.status(200).send({
            error: false,
            message: "User successfully created ",
          });
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  updateUser(req, res) {
    let param = {
      userName: req.body.userName,
      accountNumber: req.body.accountNumber,
      emailAddress: req.body.emailAddress,
      identityNumber: req.body.identityNumber,
    };

    if (!helper.isEmail(req.body.emailAddress)){
      res.status(401).send({
        error: true,
        message: "Email not valid",
      });
      return
    }

    userRepository
      .update(req.body.id, param)
      .then((result) => {
        console.log(result);
        if (result._id != null) {
          res.status(200).send({
            error: false,
            message: "User successfully updated",
          });
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  deleteUser(req, res) {
    userRepository
      .delete(req.body.id)
      .then((result) => {
        console.log(result);
        if (result._id != null) {
          res.status(200).send({
            error: false,
            message: "User successfully deleted",
          });
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },
};
