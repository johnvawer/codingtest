const User = require("../../model/User");

module.exports = async (req, res, next) => {
  const { givenName, familyName, email } = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await User.updateById(id, { givenName, familyName, email });

    return res.status(201).json({ success: true, user: updatedUser });
  } catch (err) {
    return next(err);
  }
};