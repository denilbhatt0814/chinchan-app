import { eq } from "drizzle-orm";
import { db } from ".";
import {
  InsertBrand,
  InsertCreator,
  InsertVideo,
  SelectBrand,
  SelectCreator,
  SelectVideo,
  brandsTable,
  creatorsTable,
  videosTable,
} from "./schema";

// ----------- BRAND QUERIES -----------

export async function createBrand(data: InsertBrand) {
  await db.insert(brandsTable).values(data);
}

export async function getBrandBySubdomain(
  subdomain: SelectBrand["subdomain"]
): Promise<SelectBrand | null> {
  return db
    .select()
    .from(brandsTable)
    .where(eq(brandsTable.subdomain, subdomain))
    .then((result) => (result.length > 0 ? result[0] : null));
}

// ----------- CREATOR QUERIES -----------

export async function createCreator(data: InsertCreator) {
  await db.insert(creatorsTable).values(data);
}

export async function getCreatorByUserId(
  userId: SelectCreator["userId"]
): Promise<SelectCreator | null> {
  return db
    .select()
    .from(creatorsTable)
    .where(eq(creatorsTable.userId, userId))
    .then((result) => (result.length > 0 ? result[0] : null));
}

export type getAllBrandsByCreatorIdResponseSchema = Array<SelectBrand>;
export async function getAllBrandsByCreatorId(
  id: SelectBrand["creatorId"]
): Promise<getAllBrandsByCreatorIdResponseSchema> {
  return db
    .select()
    .from(brandsTable)
    .where(eq(brandsTable.creatorId, id))
    .limit(10);
}

// ----------- VIDEO QUERIES -----------

export async function createVideo(data: InsertVideo) {
  await db.insert(videosTable).values(data);
}

export async function getVideoById(
  id: SelectVideo["id"]
): Promise<SelectVideo | null> {
  return db
    .select()
    .from(videosTable)
    .where(eq(videosTable.id, id))
    .then((result) => (result.length > 0 ? result[0] : null));
}

export type getAllVideosByCreatorIdResponseSchema = Array<SelectVideo>;
export async function getAllVideoByCreatorId(
  id: SelectBrand["creatorId"]
): Promise<getAllVideosByCreatorIdResponseSchema> {
  return db
    .select()
    .from(videosTable)
    .where(
      eq(
        videosTable.brandId,
        db
          .select({ id: brandsTable.id })
          .from(brandsTable)
          .where(eq(brandsTable.creatorId, id))
      )
    )
    .limit(10);
}

export type getAllVideosBySubdomainResponseSchema = Array<SelectVideo>;
export async function getAllVideoBySubdomain(
  subdomain: SelectBrand["subdomain"]
): Promise<getAllVideosBySubdomainResponseSchema> {
  return db
    .select()
    .from(videosTable)
    .where(
      eq(
        videosTable.brandId,
        db
          .select({ id: brandsTable.id })
          .from(brandsTable)
          .where(eq(brandsTable.subdomain, subdomain))
      )
    )
    .limit(10);
}
