import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default function CreatePost() {
  return (
    <div className="p-4 border rounded">
      <form
        action={async (formData) => {
          "use server";
          const caption = formData.get("content") as string;
          const imageUrl = formData.get("imageUrl") as string;

          const session = await auth();
          if (!session?.user?.id) {
            throw new Error("Vous devez être connecté pour publier");
          }

          await prisma.post.create({
            data: {
              caption,
              imageUrl,
              userId: session.user.id,
            },
          });

          revalidatePath("/blog");
        }}
      >
        <Input name="imageUrl" placeholder="Image URL" />
        <Textarea name="content" placeholder="Description" />
        <Button type="submit">Publier</Button>
      </form>
    </div>
  );
}
