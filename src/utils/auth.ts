import { Customer } from "../entities/Customer";
import { sign } from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_TOKEN_SECRET } from "../constants";
export const createAccessToken = (customer: Customer) => {
    console.log(process.env.ACCESS_TOKEN_SECRET)
    return sign({ username: customer.username }, JWT_TOKEN_SECRET, {
        expiresIn: "1y"
    });
};

// export const createRefreshToken = (customer: Customer) => {
//     return sign(
//         { username: customer.username },
//         JWT_REFRESH_SECRET,
//         {
//             expiresIn: "7d"
//         }
//     );
// };