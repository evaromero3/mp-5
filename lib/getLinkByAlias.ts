import getCollection, { LINK_COLLECTION } from "@/db";
import { LinkProps } from "@/types";

export async function getLinkByAlias(alias: string): Promise<LinkProps | null> {
  console.log("getLinkByAlias: querying for alias:", alias);
  const collection = await getCollection(LINK_COLLECTION);
  const link = await collection.findOne<LinkProps>({ alias });
  console.log("getLinkByAlias: result:", link);
  return link;
}
