import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

export const generateEmployeeToken = (existingUser:any): string | null => {
  try {
    const {email } = existingUser;
    
    const jwtSecretKey = process.env.jwtSecretKey;
    if (!jwtSecretKey) {
      console.error("jwtSecretKey is missing");
      process.exit(1);
    }
    const token = Jwt.sign({ email}, jwtSecretKey);
    return token;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const generateAdminToken = (adminData:any): string | null => {
  try {
    const { email } = adminData;
    const jwtSecretKey = process.env.jwtSecretKey;
    if (!jwtSecretKey) {
      console.error("jwtSecretKey is missing");
      process.exit(1);
    }
    const token = Jwt.sign({ email }, jwtSecretKey);
    return token;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// export const verifyToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(" ")[1];
//     // console.log("Auth---", token);

//     if (!token) {
//       return res
//         .status(401)
//         .json({ status: "Authentication Failure", message: "No tokens found" });
//     }
//     if (!process.env.jwtSecretKey) {
//       console.error("jwtSecretKey is missing");
//       return res
//         .status(401)
//         .json({ status: "FAILED", message: "Token verification failed" });
//     }
//     Jwt.verify(token, process.env.jwtSecretKey);

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ status: "FAILED", message: "Invalid token" });
//   }
// };



