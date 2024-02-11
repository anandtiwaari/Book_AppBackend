const userModal = require("../modal/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "BOOKS_API_KEY";
//existing user
//hashed password
//user creation
//Token generation
// const signUp = async (req, res) => {
//   const { username, email, password } = req.body;
//   console.log(username, email, password, "ssssss");
//   try {
//     const existingUser = await userModal.findOne({ email: email });
//     if (existingUser) {
//       return res.status(400).json({ message: "user already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await userModal.create({
//       username: username,
//       email: email,
//       password: hashedPassword,
//     });
//     const token = await jwt.sign(
//       { email: result.email, id: result._id },
//       SECRET_KEY
//     );
//     res.status(201).json({ user: result, token: token });
//   } catch (error) {
//     res.send(error.message);
//   }
// };

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModal.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = await jwt.sign(
      {
        email: existingUser.email,
        password: existingUser.password,
      },
      SECRET_KEY
    );
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
  }

  res.send(`signIn `);
};

const signUps = async (req, res) => {
  const { email, password, username } = req.body;
  const existingUser = await userModal.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: "user already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await userModal({
    email: email,
    password: hashedPassword,
    username: username,
  });
  await result.save();
  //   const result = await userModal.create({
  //     email: email,
  //     password: hashedPassword,
  //     username: username,
  //   });
  const token = await jwt.sign({ email: email, id: result._id }, SECRET_KEY);
  res.status(201).json({ user: result, token: token });
};

const signIns = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userModal.findOne({
    email: email,
  });

  if (!existingUser) {
    return res.status(400).json({ message: "user not found" });
  }
  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  const token = await jwt.sign(
    {
      email: existingUser.email,
      password: existingUser.password,
    },
    SECRET_KEY
  );
  res.status(200).json({ user: existingUser, token: token });
};

module.exports = {
  signIn,
  //   signUp,
  signUps,
  signIns,
};
