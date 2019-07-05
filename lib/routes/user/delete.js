const User = require("../../model/User");

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userToDelete = await User.deleteById(id);

    return res.status(200).json({ success: true, user: userToDelete });
  } catch (err) {
    return next(err);
  }
};