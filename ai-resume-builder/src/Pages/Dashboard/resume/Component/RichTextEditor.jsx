import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuillTest() {
  const [content, setContent] = useState("");

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        }}
        formats={["bold", "italic", "underline", "list", "bullet"]}
      />
      <h3>Quill Output:</h3>
      <div style={{ background: "#f3f4f6", padding: "10px", borderRadius: "5px" }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
