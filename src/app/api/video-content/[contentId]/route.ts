import { deleteVideo, getVideoById, updateVideo } from "@/db/queries";
import { insertVideoSchema, SelectVideo, updateVideoSchema } from "@/db/schema";
import { getPublicIdFromUrl } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";

export async function PATCH(request: Request) {
  try {
    const data = await request.json();

    const result = updateVideoSchema.safeParse(data);

    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 });
    }
    const updateContentData = result.data;

    const content = await getVideoById(updateContentData.id);
    if (!content) {
      return Response.json({ message: "Content not found!" }, { status: 404 });
    }

    if (content.mediaUrl != updateContentData.mediaUrl) {
      removeVideoFromStorage(content);
    }
    if (content.thumbnailUrl != updateContentData.thumbnailUrl) {
      removeThumbnailFromStorage(content);
    }

    await updateVideo(result.data);

    return Response.json(
      { message: "Content updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in create video content route", error);
    return Response.json(
      { success: false, message: "Error creating video content" },
      { status: 500 }
    );
  }
}

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
    const deletionPromises = [];
    const deleteVideoPromise = removeVideoFromStorage(content);
    deletionPromises.push(deleteVideoPromise);

    const deleteThumbnailPromise = removeThumbnailFromStorage(content);
    deletionPromises.push(deleteThumbnailPromise);

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

function removeVideoFromStorage(content: SelectVideo) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const videoPublicId = getPublicIdFromUrl(content.mediaUrl);
  console.log(videoPublicId);
  if (!videoPublicId) {
    throw new Error(
      `Unable to extract PublicId from URL: ${[content.mediaUrl]}`
    );
  }

  const destroyVideoPromise = cloudinary.api.delete_resources([videoPublicId], {
    type: "upload",
    resource_type: "video",
  });

  return destroyVideoPromise;
}

function removeThumbnailFromStorage(content: SelectVideo) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const videoPublicId = getPublicIdFromUrl(content.mediaUrl);
  const thumbnailPublicId = getPublicIdFromUrl(content.thumbnailUrl);

  if (!videoPublicId || !thumbnailPublicId) {
    throw new Error(
      `Unable to extract PublicId from URL: ${[
        content.mediaUrl,
        content.thumbnailUrl,
      ]}`
    );
  }

  if (thumbnailPublicId != videoPublicId) {
    return cloudinary.api.delete_resources([thumbnailPublicId], {
      type: "upload",
      resource_type: "image",
    });
  }

  return;
}
