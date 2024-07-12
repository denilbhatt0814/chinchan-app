import { getBrandById, updateBrand } from "@/db/queries";
import { SelectBrand, updateBrandSchema } from "@/db/schema";
import { getPublicIdFromUrl } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";

export async function PATCH(request: Request) {
  try {
    const data = await request.json();

    const result = updateBrandSchema.safeParse(data);

    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 });
    }
    const updateBrandData = result.data;

    const brand = await getBrandById(updateBrandData.id);
    if (!brand) {
      return Response.json({ message: "Brand not found!" }, { status: 404 });
    }

    if (brand.logoUrl != updateBrandData.logoUrl) {
      removeLogoFromStorage(brand);
    }
    if (brand.bannerUrl != updateBrandData.bannerUrl) {
      removeBannerFromStorage(brand);
    }

    await updateBrand(result.data);

    return Response.json(
      { message: "Content updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in update brand route", error);
    return Response.json(
      { success: false, message: "Error updating brand data" },
      { status: 500 }
    );
  }
}

function removeLogoFromStorage(brand: SelectBrand) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const logoPublicId = getPublicIdFromUrl(brand.logoUrl);

  if (!logoPublicId) {
    throw new Error(`Unable to extract PublicId from URL: ${[brand.logoUrl]}`);
  }

  return cloudinary.api.delete_resources([logoPublicId], {
    type: "upload",
    resource_type: "image",
  });
}

function removeBannerFromStorage(brand: SelectBrand) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const bannerPublicId = getPublicIdFromUrl(brand.bannerUrl);

  if (!bannerPublicId) {
    throw new Error(
      `Unable to extract PublicId from URL: ${[brand.bannerUrl]}`
    );
  }

  return cloudinary.api.delete_resources([bannerPublicId], {
    type: "upload",
    resource_type: "image",
  });
}
