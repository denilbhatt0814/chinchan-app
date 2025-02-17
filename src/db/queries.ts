import { eq } from "drizzle-orm";
import { db } from ".";
import {
  InsertBrand,
  InsertCreator,
  InsertVideo,
  SelectBrand,
  SelectCreator,
  SelectUser,
  SelectVideo,
  UpdateBrand,
  UpdateVideo,
  brandsTable,
  creatorsTable,
  usersTable,
  videosTable,
} from "./schema";

// ----------- USER QUERIES -----------

export async function getUserByEmail(
  email: SelectUser["email"]
): Promise<SelectUser | null> {
  return db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .then((result) => (result.length > 0 ? result[0] : null));
}
// ----------- BRAND QUERIES -----------

export async function createBrand(data: InsertBrand) {
  await db.insert(brandsTable).values(data);
}

export async function getBrandById(
  id: SelectBrand["id"]
): Promise<SelectBrand | null> {
  return db
    .select()
    .from(brandsTable)
    .where(eq(brandsTable.id, id))
    .then((result) => (result.length > 0 ? result[0] : null));
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

export async function updateBrand(data: UpdateBrand) {
  await db.update(brandsTable).set(data).where(eq(brandsTable.id, data.id));
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

export async function updateVideo(data: UpdateVideo) {
  await db.update(videosTable).set(data).where(eq(videosTable.id, data.id));
}

export async function deleteVideo(id: SelectVideo["id"]) {
  await db.delete(videosTable).where(eq(videosTable.id, id));
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

export type getAllVideosByBrandIdResponseSchema = Array<SelectVideo>;
export async function getAllVideoByBrandId(
  id: SelectVideo["brandId"]
): Promise<getAllVideosByCreatorIdResponseSchema> {
  return db
    .select()
    .from(videosTable)
    .where(eq(videosTable.brandId, id))
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
