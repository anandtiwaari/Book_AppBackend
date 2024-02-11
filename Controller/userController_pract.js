// const userModal = require("../modal/userModal");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "BOOK_APP_KEY";
// const UserRegister = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const existingUser = await userModal.findOne({ email: email });
//     if (existingUser) {
//       return res.status(400).json({ message: "user already registered" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await userModal({
//       username: username,
//       email: email,
//       password: hashedPassword,
//     });
//     await result.save();
//     console.log(result._id.toString(), "show the result");
//     const token = jwt.sign(
//       { email: email, id: result._id.toString() },
//       SECRET_KEY
//     );
//     console.log(token, "token");
//     res.status(201).json({ user: result, token: token });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const userSignin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const existingUser = await userModal.findOne({ email: email });
//     if (!existingUser) {
//       return res.status(400).json({ message: "user not found" });
//     }
//     const matchedPassword = await bcrypt.compare(
//       password,
//       existingUser.password
//     );
//     if (!matchedPassword) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign(
//       {
//         email: existingUser.email,
//         password: existingUser.password,
//         id: existingUser._id,
//       },
//       SECRET_KEY
//     );
//     res.status(201).json({ user: existingUser, token: token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("something went wrong");
//   }
// };

// module.exports = { UserRegister, userSignin };

const userModal = require("../modal/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "BOOK_APP_KEY";

const Up = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await userModal.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModal({
      username: username,
      password: hashedPassword,
      email: email,
    });
    await result.save();
    console.log(result._id.toString(), "show id in the signup controller");
    const accessToken = jwt.sign(
      {
        email: result.email,
        id: result._id.toString(),
      },
      SECRET_KEY
    );
    res.status(201).json({ user: result, accessToken: accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went wrong" });
  }
};

const In = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModal.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = jwt.sign(
      {
        email: existingUser.email,
        password: existingUser.password,
        id: existingUser._id.toString(),
      },
      SECRET_KEY
    );
    return res
      .status(201)
      .json({ user: existingUser, accessToken: accessToken });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  Up,
  In,
};
