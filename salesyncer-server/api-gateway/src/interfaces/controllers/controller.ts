import { Request, Response } from "express";
import { verifyAdminLogin } from "../../usecases/auth";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await verifyAdminLogin(data);

    console.log("myresp", response);
    res.json(response);
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
