// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "BOOK_APP_KEY";
// const auth_pract = async (req, res, next) => {
//   try {
//     let token = req.headers.authorization;
//     token = token.split(" ")[1];
//     if (!token) {
//       return res.status(400).json({ message: "unauthorized access" });
//     }
//     let verifyToken = jwt.verify(token, SECRET_KEY);
//     console.log(verifyToken.id, "show the verification token");
//     req.userId = verifyToken?.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(403).json({ message: "invalid token" });
//   }
// };

// module.exports = auth_pract;
const SECRET_KEY = "BOOK_APP_KEY";
const jwt = require("jsonwebtoken");

const auth_pract = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "User not authorized" });
    }
    if (token == null) {
      return;
    }
    let verifyToken = jwt.verify(token, SECRET_KEY);
    console.log(verifyToken);
    req.userId = verifyToken.id;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = auth_pract;
