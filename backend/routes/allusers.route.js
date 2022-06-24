const { User } = require('../model/user.model')

exports.userData = async (req, res) => {
    const user = await User.find({ });
    res.status(200).json(user);
}