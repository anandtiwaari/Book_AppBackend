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
const cloudinary = require("../utils/cloudinary");

const Up = async (req, res) => {
  try {
    console.log(req.file, "show the signup File here now");
    const { username, email, password } = req.body;
    const results = await cloudinary.uploader.upload(req.file.path);
    console.log(results, "show the results here");
    const existingUser = await userModal.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModal({
      username: username,
      password: hashedPassword,
      email: email,
      imageUrl: results.url,
      public_id: results.public_id,
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

const updateProfile = async (req, res) => {
  const userId = req.userId;

  try {
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, {
        public_id: req?.body?.public_id,
        overwrite: true,
      });
      console.log(result, "show the result here uiuiuiu");
    }
    if (!userId) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    const response = await userModal.updateOne(
      { _id: userId },
      {
        $set: {
          imageUrl: result?.url,
        },
      },
      { upsert: true }
    );
    return res
      .status(200)
      .json({ message: "Profile updated successfully", data: result.url });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
  Up,
  In,
  updateProfile,
};
