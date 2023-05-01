import dynamic from "next/dynamic";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function () {
  const [text, setText] = useState("");

  const submitForm = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("text", text)
    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <MdEditor
        style={{ height: "500px" }}
        value={text}
        onChange={({ text }) => setText(text)}
        // eslint-disable-next-line react/no-children-prop
        renderHTML={(text) => <ReactMarkdown children={text} />}
      />
      <button onClick={submitForm}>Submit</button>
    </div>
  );
}