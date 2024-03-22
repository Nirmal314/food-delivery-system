import { getRestaurants } from "@/actions/user/getrestauranrts";

export async function GET() {
  const restaurants = await getRestaurants();

  return Response.json({ restaurants });
}
