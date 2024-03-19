import { getMenuItemsByMenuId } from "@/data/admin";

export async function GET(req: Request) {
  const id = req.url.split("/")[req.url.split("/").length - 1];
  const menuItems = await getMenuItemsByMenuId(id);

  return Response.json({ menuItems });
}
