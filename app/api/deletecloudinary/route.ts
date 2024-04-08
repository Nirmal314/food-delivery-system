import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request): Promise<Response> {
  const { selectedImages } = await req.json();
  try {
    await cloudinary.api.delete_resources(selectedImages, {
      type: "upload",
      resource_type: "image",
    });

    return Response.json({ success: "Resources deleted." });
  } catch (error) {
    return Response.json({ error: "Something went wrong." });
  }
}
