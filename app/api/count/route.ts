let count = 0;

export async function GET() {
  return Response.json({ count });
}

export async function POST(req: Request) {
  const { amount } = await req.json();

  if (amount) count += Number(amount);

  return Response.json({ count });
}
