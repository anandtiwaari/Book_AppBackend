const jwt = require("jsonwebtoken");
const SECRET_KEY = "BOOKS_API_KEY";

const authMiddleware = async (req, res, next) => {
  try {
    let token = await req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    token = token.split(" ")[1];
    let user = jwt.verify(token, SECRET_KEY);
    req.userId = user?.id; 
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized user" });
  }
};
module.exports = authMiddleware;
