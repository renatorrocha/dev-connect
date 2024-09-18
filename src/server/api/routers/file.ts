import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { supabase } from "~/server/bucket";

export const fileRouter = createTRPCRouter({
  uploadProjectImage: protectedProcedure.input(file).query(async ({ ctx }) => {
    const { data, error } = await supabase.storage
      .from("dev-bridge-bucket")
      .upload(`images/projects/${file.originalname}`, file.buffer, {
        contentType: fileRouter.mimetype,
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
  }),
});
