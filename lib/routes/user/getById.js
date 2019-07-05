const User = require("../../model/User");

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const usersResult = await User.getById(id);
    return res.status(200).json({ success: true, user: usersResult });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};