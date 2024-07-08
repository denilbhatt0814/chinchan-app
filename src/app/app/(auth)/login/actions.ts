"use server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function login({ email }: { email: string }) {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .then((res) => res[0]);
    cookies().set("userId", user.id.toString());
    cookies().set("email", email);
  } catch (error) {
    console.log(error);
  }

  return { message: "ok" };
}
