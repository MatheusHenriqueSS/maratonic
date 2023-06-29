"use client";
import { Post } from "@prisma/client";
import React from "react";

export default async function PostPreview({
  params: { id },
}: {
  params: { id: string };
}) {
  const [classes, setClasses] = React.useState<Post[]>([]);
  const [content, setContent] = React.useState<string>("");
  if (content === "") {
    fetch("../api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((posts) => {
        for (var post of posts) {
          if (post.id == id) {
            setContent(post.content.toString());
          }
        }
      })
      .catch((error) => console.log(content));
    return (
      <div
        dangerouslySetInnerHTML={{ __html: "<strong>strong text</strong>" }}
      />
    );
  }
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
