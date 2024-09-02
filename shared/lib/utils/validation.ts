import { z } from "zod";

export const getBodyValidErrors = <T extends z.ZodSchema>(
  body: unknown,
  schema: T
): null | { name: string; message: string }[] => {
  const { error } = schema.safeParse(body);
  if (!error) return null;
  return error.errors.map(({ path, message }) => ({
    name: path[0].toString(),
    message,
  }));
};
