import jwt from "jsonwebtoken";
import "dotenv/config";

const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const genereateToken = async (userObject) => {
  try {
    const payload = {
      userId: userObject.userId, // Example: user ID
      username: userObject.username, // Example: username
      role: userObject.role,
    };
    // Generate a token using jwt.sign()
    const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1h" }); // Change 'your_secret_key' to your actual secret key

    return {
      succes: true,
      token: token,
      message: "Token generated",
    };
  } catch (error) {
    return {
      succes: false,
      message: "Unable to generate token",
    };
  }
};

export const verifyTokenMiddleware = (requiredRole) => (req, res, next) => {
  // Get the token from the request headers or query parameters or cookies
  const methodType = req.method;
  const token =
    req.headers.authorization || req.query.token || req.cookies.token;

  if (!token) {
    if (methodType == "GET") return res.status(401).render("403");
    else
      return res.status(401).json({
        succes: false,
        message: "No token provided",
      });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, TOKEN_SECRET);

    // Set req.user to the decoded payload
    req.user = decoded;

    if (!requiredRole.includes(req.user.role)) {
      if (methodType == "GET") return res.status(403).render("403");
      else
        return res.status(403).json({
          succes: false,
          message: "Your are not authorized to carry out this operation",
        });
    }

    // Call next to move to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json({ success: false, message: "Token verification failed" });
  }
};
