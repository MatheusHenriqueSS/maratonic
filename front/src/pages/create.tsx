import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false
});

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function () {
  return (
    <MdEditor
      style={{ height: "500px" }}
      // eslint-disable-next-line react/no-children-prop
      renderHTML={(text) => <ReactMarkdown children={text} />}
    />
  );
}