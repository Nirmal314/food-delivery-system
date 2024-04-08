import { CartProvider } from "./CartContext";

export default async function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CartProvider>{children}</CartProvider>;
}
