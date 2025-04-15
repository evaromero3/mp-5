import getCollection, {LINK_COLLECTION} from "@/db"
import {LinkProps} from "@/types"

export default async function getAllLinks():Promise<LinkProps[]> {
    const linksCollection = await getCollection(LINK_COLLECTION);
    const data = await linksCollection.find().toArray();

    const links: LinkProps[] = data.map((link) => ({
        id: link._id.toHexString(),
        alias: link.alias,
        originalURL: link.originalURL,
    }));

    return links.reverse();
}