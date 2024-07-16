import { createCreator } from "@/db/queries";
import { insertCreatorSchema } from "@/db/schema";
import { getServerSession, User } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
      return Response.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }
    const userId = user.id;

    const data = {
      userId: userId,
    };
    const result = insertCreatorSchema.safeParse(data);

    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 });
    }

    await createCreator(result.data);

    return Response.json(
      { message: "Creator added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in create creator route", error);
    return Response.json(
      { success: false, message: "Error creating creator" },
      { status: 500 }
    );
  }
}
