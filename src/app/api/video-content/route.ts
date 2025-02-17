import { createVideo } from "@/db/queries";
import { insertVideoSchema } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const result = insertVideoSchema.safeParse(data);

    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 });
    }

    await createVideo(result.data);

    return Response.json(
      { message: "Content added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in create video content route", error);
    return Response.json(
      { success: false, message: "Error creating video content" },
      { status: 500 }
    );
  }
}
