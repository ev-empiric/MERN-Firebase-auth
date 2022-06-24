const { User } = require('../model/user.model')
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
    try {
        const requestData = req.body
        if (!requestData.contact)
            res.status(400).send({ message: "All input is required" });

        const contact = '+1 ' + requestData.contact
        const usercontact = await User.findOne({ contact });
        if (usercontact) {
            
            const _id = requestData._id
            const user = await User.findOne({ _id });
            if (!user)
                return res.status(409).send({ message: "User Not Exist. Please Register First" });

            const token = jwt.sign(
                { user_id: user._id },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        } else {
            return res.status(409).send({ message: "Please Enter Valid Number" });
        }


        // res.status(200).send({ data: token, message: "Logged in successfully" })
    } catch (err) {
        console.log(err);
    }
}