import jwt from "jsonwebtoken";
import { UserRole } from "../../../types/user";

const ACCESS_TIME = "1h";
const REFRESH_TIME = "10days";

const secretKey = process.env.JWT_SECRET!;

export type Token = "ACCESS" | "REFRESH";
export const getToken = (id: string, role: UserRole, tokenType: Token) =>
  jwt.sign({ id, role }, secretKey, {
    expiresIn: tokenType === "ACCESS" ? ACCESS_TIME : REFRESH_TIME,
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
