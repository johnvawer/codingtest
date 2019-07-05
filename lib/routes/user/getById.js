const Users = require("../../store/Users");

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const usersResult = await Users.getById();
    return res.status(200).json({ success: true, user: usersResult });
  } catch (err) {
    return next(err);
  }
};