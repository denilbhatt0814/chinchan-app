import { getBrandBySubdomain } from "@/db/queries";
import { z } from "zod";

const SubdomainQuerySchema = z.object({
  subdomain: z
    .string()
    .min(3, "Subdomain must be atleast 3 characters.")
    .max(20, "Subdomain must be no more than 20 characters.")
    .regex(/^[a-zA-Z0-9_-]+$/, "Subdomain must not contain special characters"),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParmas = { subdomain: searchParams.get("subdomain") };

    const result = SubdomainQuerySchema.safeParse(queryParmas);
    if (!result.success) {
      const subdomainErrors = result.error.format().subdomain?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            subdomainErrors.length > 0
              ? subdomainErrors.join(", ")
              : "Invalid Query Params",
        },
        { status: 400 }
      );
    }

    const { subdomain } = result.data;
    const existingSubdomain = await getBrandBySubdomain(subdomain);
    if (existingSubdomain) {
      return Response.json(
        {
          success: false,
          message: "Subdomain is already taken",
        },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Subdomain is available" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error checking subdomain: ", error);
    return Response.json(
      { error: false, message: "Error checking subdomain" },
      { status: 500 }
    );
  }
}
