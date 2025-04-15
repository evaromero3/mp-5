import { redirect } from "next/navigation";
import { getLinkByAlias } from "@/lib/getLinkByAlias";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  // Wait until params are resolved before destructuring alias
  const { alias } = await params;
  console.log("RedirectPage: Received alias:", alias);

  const link = await getLinkByAlias(alias);
  console.log("RedirectPage: link returned from DB:", link);

  if (!link) {
    console.log("No link found for alias:", alias);
    redirect("/404");
  }

  console.log("Redirecting to:", link.originalURL);
  redirect(link.originalURL);
  return null;
}
