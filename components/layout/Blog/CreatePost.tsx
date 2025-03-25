"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handlePost = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ imageUrl, caption }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setCaption("");
      setImageUrl("");
    }
  };

  return (
    <div className="p-4 border rounded">
      <Input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Button onClick={handlePost}>Publier</Button>
    </div>
  );
}
