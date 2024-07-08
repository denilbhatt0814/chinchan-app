import { createCreator } from "@/db/queries";
import { insertCreatorSchema } from "@/db/schema";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const userId = cookies().get("userId")?.value;

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
