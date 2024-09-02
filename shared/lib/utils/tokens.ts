import jwt from "jsonwebtoken";
import { UserRole } from "../../../types/user";

const accessTime = "1h";
const refreshTime = "10days";

const secretKey = process.env.SECRET_KEY!;

export type Token = "ACCESS" | "REFRESH";
export const getToken = (id: string, role: UserRole, tokenType: Token) =>
  jwt.sign({ id, role }, secretKey, {
    expiresIn: tokenType === "ACCESS" ? accessTime : refreshTime,
  });

export const getUserDataByToken = (token: string) => {
  try {
    const idRole = jwt.verify(token, secretKey) as {
      id: string;
      role: UserRole;
    };
    return idRole;
  } catch {
    console.error("Error token: ", token);
    return null;
  }
};

export const getNewTokens = (id: string, role: UserRole) => ({
  access: getToken(id, role, "ACCESS"),
  refresh: getToken(id, role, "REFRESH"),
});
