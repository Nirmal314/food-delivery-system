import { getMenuItemByMenuItemId } from "@/data/admin";

export async function GET(req: Request) {
  const id = req.url.split("/")[req.url.split("/").length - 1];
  const menuItem = await getMenuItemByMenuItemId(id);

  return Response.json({ menuItem });
}
