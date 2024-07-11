import { deleteVideo, getVideoById } from "@/db/queries";
import { SelectVideo } from "@/db/schema";
import { v2 as cloudinary } from "cloudinary";

export async function DELETE(
  request: Request,
  { params }: { params: { contentId: SelectVideo["id"] } }
) {
  try {
    const content = await getVideoById(params.contentId);

    if (!content) {
      return Response.json({ message: "Content not found!" }, { status: 404 });
    }

    // remove media from storage - TODO:
    await removeVideoFromStorage(content);

    await deleteVideo(content.id);

    return Response.json(
      { message: "Content deleted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error in delete video content route", error);
    return Response.json(
      {
        success: false,
        message: "Error creating video content",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

async function removeVideoFromStorage(content: SelectVideo) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const videoPublicId = getPublicIdFromUrl(content.mediaUrl);
  const thumbnailPublicId = getPublicIdFromUrl(content.thumbnailUrl);
  console.log(videoPublicId, thumbnailPublicId);
  if (!videoPublicId || !thumbnailPublicId) {
    throw new Error(
      `Unable to extract PublicId from URL: ${[
        content.mediaUrl,
        content.thumbnailUrl,
      ]}`
    );
  }

  const deletionPromises = [];

  const destroyVideoPromise = cloudinary.api.delete_resources([videoPublicId], {
    type: "upload",
    resource_type: "video",
  });
  deletionPromises.push(destroyVideoPromise);

  if (thumbnailPublicId != videoPublicId) {
    const destroyThumbnailPromise = cloudinary.api.delete_resources(
      [thumbnailPublicId],
      { type: "upload", resource_type: "image" }
    );
    deletionPromises.push(destroyThumbnailPromise);
  }

  const results = await Promise.allSettled(deletionPromises);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        `Error destroying ${index === 0 ? "video" : "thumbnail"}:`,
        result.reason
      );
    } else {
      console.log(result);
    }
  });

  if (results.some((result) => result.status === "rejected")) {
    throw new Error("One or more deletions failed.");
  }
}

function getPublicIdFromUrl(url: string): string | null {
  const regex = /\/v\d+\/([^/.]+\/[^/.]+)(?:\.[^/.]+)?$/;

  const match = url.match(regex);
  return match ? match[1] : null;
}
