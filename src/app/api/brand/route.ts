import { createBrand } from "@/db/queries";
import { insertBrandSchema } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // add creator id to data
    data.creatorId = 1;

    const result = insertBrandSchema.safeParse(data);

    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 });
    }

    await createBrand(result.data);

    return Response.json(
      { message: "Brand added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in create brand route", error);
    return Response.json(
      { success: false, message: "Error creating brand" },
      { status: 500 }
    );
  }
}
