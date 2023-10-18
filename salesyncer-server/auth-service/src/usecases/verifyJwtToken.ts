import Jwt from "jsonwebtoken";

export const tokenVerification = async (
    data: any) => {
    try {
        const authHeader = data.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        // console.log("Auth---", token);

        if (!token) {
            return { status: "Authentication Failure", message: "No tokens found" };
        }
        if (!process.env.jwtSecretKey) {
            console.error("jwtSecretKey is missing");
            return { status: "FAILED", message: "Token verification failed" };
        }
        const response = Jwt.verify(token, process.env.jwtSecretKey);
        if (response) {
            return { status: "OK", message: "Token Successfully verified" }
        }
        else {
            return { status: "FAILED", message: "Token verification failed" }
        }


    } catch (error) {
        console.error(error);
        return { status: "FAILED", message: "Invalid token" };
    }
};


export default tokenVerification;