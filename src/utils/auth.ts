import { Customer } from "../entities/Customer";
import { sign } from "jsonwebtoken";
import { JWT_TOKEN_SECRET } from "../constants";
export const createAccessToken = (customer: Customer) => {
    return sign({ username: customer.username }, JWT_TOKEN_SECRET, {
        expiresIn: "1y"
    });
};