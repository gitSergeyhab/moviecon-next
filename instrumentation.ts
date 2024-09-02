import connect from "@/shared/lib/db/dbConnect";

export async function register() {
  await connect();
}
