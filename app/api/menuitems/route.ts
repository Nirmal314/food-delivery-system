import { getMenuItemsByMenuId } from "@/data/admin";
import { db } from "@/lib/db";
import { MenuItem } from "@/typings";

export async function GET() {
  //   const menuItems = await getMenuItemsByMenuId("cltxzg7ey00037iejdr9ha43j");

  //   const res: MenuItem[] = (await getMenuItemsByMenuId(
  //     "cltxzg7ey00037iejdr9ha43j"
  //   )) as MenuItem[];
  const res = await db.menuItem.findMany();

  return Response.json(res);
}
