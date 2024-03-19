import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const { selectedImages } = await req.json();

  try {
    const res = await cloudinary.api.delete_resources(selectedImages, {
      type: "upload",
      resource_type: "image",
    });

    console.log(res.deleted);
    return Response.json({ success: "Resources deleted." });
  } catch (error) {
    return Response.json({ success: "Something went wrong." });
  }
}
