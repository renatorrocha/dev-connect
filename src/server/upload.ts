import { supabase } from "./bucket";

export const uploadImage = async (file: Express.Multer.File) => {
  const { data, error } = await supabase.storage
    .from("dev-bridge-bucket")
    .upload(`images/projects/${file.originalname}`, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image");
  }

  const { publicUrl, error: urlError } = supabase.storage
    .from("dev-bridge-bucket")
    .getPublicUrl(data.path);

  if (urlError) {
    console.error("Error getting public URL:", urlError);
    throw new Error("Error getting public URL");
  }

  return publicUrl;
};
