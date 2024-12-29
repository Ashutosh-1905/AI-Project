import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = async (email) => {
    try {
        const token = await jwt.sign(
          { email},
          config.jwtSecret,
          { expiresIn: "1h"}
        );
        return token;

    } catch (error) {
        throw new Error(500, "Error While Generating Token.");
    }
};

export default generateToken;