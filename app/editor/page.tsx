"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";
import TextareaAutosize from "react-textarea-autosize";

const DynamicMarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor"),
  {
    ssr: false,
  }
);

interface CategoryType {
  id: string;
  name: string;
}

function HomePage() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("Hello Markdown!");
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(
            data.map((item: any) => {
              return { label: item.name, value: item.id };
            })
          );
        } else {
          console.error("Failed to fetch categories.");
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCreatePost = async () => {
    if (!title) {
      toast.error("Title is required", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Format the MD string using markdown-it
    const markdownIt = require("markdown-it")();
    const formattedContent = markdownIt.render(value);

    // Send the formatted content to the API to create a new post
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: value,
        categories: selectedCategories.map((item) => item.label),
        authorId: "649cda21dcec376834a0e692",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast.success("Post created sucessfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Do something with the successful response
    } else {
      toast.error("Failed to create post", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <TextareaAutosize
        style={{ color: "white" }}
        autoFocus
        id="title"
        defaultValue="Untitled Post"
        placeholder="Post title"
        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
        onChange={(e: any) => setTitle(e.target.value)}
      />
      <div style={{ maxWidth: "50%" }}>
        <MultiSelect
          options={categories}
          value={selectedCategories}
          onChange={setSelectedCategories}
          labelledBy="Select"
        />
      </div>

      {/* <div className="container mx-auto mt-20">
        <MultiSelect value={selectedCategories} onChange={(e) => setSelectedCategories(e.value)} options={categories} optionLabel="name" display="chip" 
            placeholder="Select Categories" maxSelectedLabels={3} className="lg:w-1/2 w-full" />
    </div> */}

      <DynamicMarkdownEditor
        hideToolbar={true}
        style={{ minHeight: "500px" }}
        value={value}
        onChange={setValue}
      />

      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={handleCreatePost}
      >
        Create Post
      </button>
    </div>
  );
}

export default HomePage;
