import {
  EditorContext,
  EditorProvider,
} from "@/app/components/PostEditor/EditorContext";
import { useEditor } from "@/app/components/PostEditor/useEditor";

export default function Class() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="shadow-md border border-gray-200 rounded-lg md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <EditorProvider />
          </div>
        </div>
      </section>
    </>
  );
}
