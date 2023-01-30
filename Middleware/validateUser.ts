import jwt from "jsonwebtoken";

export const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];

    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    const user = await decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "User not authorised!",
    });
  }
}