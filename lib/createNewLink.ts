
"use server";

import  getCollection  from "@/db"; 
import { LinkProps } from "@/types";

export async function createNewLink(
    alias: string, originalURL: string
): Promise<LinkProps | { error: string }> {
    console.log("creating new link");

  // Validate the original URL by attempting to construct a URL object.
  try {
    new URL(originalURL);
  } catch (error) {
    console.error("URL validation error:", error);
    return { error: "Invalid URL provided." };
  }

  // Retrieve the collection (e.g., named "LINK_COLLECTION")
  const linksCollection = await getCollection("LINK_COLLECTION");

  // Check if the alias already exists
  const existing = await linksCollection.findOne({ alias });
  if (existing) {
    return { error: "Alias is already taken." };
  }

  // Create the URL mapping document
    const linkDoc = {
        alias,
        originalURL,
    };
  
  // Insert the new mapping into MongoDB
  const res = await linksCollection.insertOne(linkDoc);

  if (!res.acknowledged){
    throw new Error("DB insert failed")
  }

  const newLink: LinkProps = {
    ...linkDoc,
    id:res.insertedId.toHexString(),
  };

  return newLink;
}
