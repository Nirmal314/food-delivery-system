import { getCartByUserId } from "@/actions/user/getcartbyuserid";
import { getCartItemsByCartId } from "@/actions/user/getcartitemsbycartid";

export async function POST(req: Request) {
  const { userId } = await req.json();
  const { cart } = await getCartByUserId(userId);
  const cartItems = await getCartItemsByCartId(cart?.id!);

  return Response.json({ cartItems });
}
