import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import logger from "../services/winston";

export const generateEmployeeToken = (existingUser:any): string | null => {
  try {
    const {email,empId } = existingUser;
    
    const jwtSecretKey = process.env.jwtSecretKey;
    if (!jwtSecretKey) {
      logger.error("jwtSecretKey is missing");
      process.exit(1);
    }
    const token = Jwt.sign({ email,empId,role:"employee"}, jwtSecretKey);
    return token;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const generateAdminToken = (adminData:any): string | null => {
  try {
    const { email } = adminData;
    const jwtSecretKey = process.env.jwtSecretKey;
    if (!jwtSecretKey) {
      logger.error("jwtSecretKey is missing");
      process.exit(1);
    }
    const token = Jwt.sign({ email,role:"admin" }, jwtSecretKey);
    return token;
  } catch (err) {
    logger.error(err);
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

//     if (!token) {
//       return res
//         .status(401)
//         .json({ status: "Authentication Failure", message: "No tokens found" });
//     }
//     if (!process.env.jwtSecretKey) {
//       logger.error("jwtSecretKey is missing");
//       return res
//         .status(401)
//         .json({ status: "FAILED", message: "Token verification failed" });
//     }
//     Jwt.verify(token, process.env.jwtSecretKey);

//     next();
//   } catch (error) {
//     logger.error(error);
//     res.status(401).json({ status: "FAILED", message: "Invalid token" });
//   }
// };



