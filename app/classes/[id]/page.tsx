/* eslint-disable react/no-children-prop */
"use client";
import dynamic from "next/dynamic";
import Nav from "@/app/components/Nav/Nav";
import { Post } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MarkdownEditor from "@uiw/react-markdown-editor";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

function getPostId(st: string) {
  var parts = st.split("/");
  var lastPart = parts[parts.length - 1];
  return lastPart;
}

const DynamicMarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((module) => module.default),
  {
    ssr: false,
  }
);

export default function Post({ post }: any) {
  const pathname = usePathname();
  const postId = getPostId(pathname);
  const [markdownValue, setMarkdownValue] = useState("Hello Markdown!");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`../api/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const posts: Post[] = await res.json();

      console.log("postId", postId);

      const curPost = posts.find((p) => p.id === postId);
      // Update the markdown value based on the fetched post data
      if (curPost) {
        setMarkdownValue(curPost.content);
      }

      console.log("post", curPost);
    };

    fetchPosts();
  }, [postId]);

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center w-full">
        <div className="container bg-white ">
          <ReactMarkdown
            children={markdownValue}
            rehypePlugins={[rehypeHighlight]}
          />
        </div>
      </div>
    </>
  );
}
