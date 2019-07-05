const User = require("../../model/User");

module.exports = async (req, res, next) => {
  const { givenName, familyName, email } = req.body;
  const user = new User({ givenName, familyName, email });

  try {
    const newUser = await user.save();

    return res.status(200).json({ success: true, user: newUser });
  } catch (err) {
    return next(err);
  }
};