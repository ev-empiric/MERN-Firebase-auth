const { User } = require('../model/user.model')
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { _id,name, email, contact } = req.body

        if (!(email && name && contact))
            res.status(400).send({ message: "All input is required" });

        const oldEmail = await User.findOne({ email });
        if (oldEmail)
            return res.status(409).send({ message: "User Already Exist. Please Login" });

        const oldUser = await User.findOne({ contact });
        if (oldUser)
            return res.status(409).send({ message: "User Already Exist. Please Login" });


        const user = await User.create({
            _id : _id,
            name: name,
            email: email,
            contact: '+1 '+contact,
            profile: '',
            isAdmin: false
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
        );
        // save user token
        user.token = token;
        console.log(user.token);

        res.status(201).send(user);
    } catch (err) {
        console.log(err);
    }
}