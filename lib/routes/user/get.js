const Users = require("../../store/Users");

module.exports = async (req, res, next) => {
  try {
    const usersResult = await Users.findAll();
    return res.status(200).json({ success: true, users: usersResult });
  } catch (err) {
    return next(err);
  }
};