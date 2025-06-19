import "on-codemerge/public.css";
import "on-codemerge/index.css";
import "on-codemerge/plugins/BlockPlugin/public.css";
import "on-codemerge/plugins/ChartsPlugin/public.css";
import "on-codemerge/plugins/CodeBlockPlugin/public.css";
import "on-codemerge/plugins/FootnotesPlugin/public.css";
import "on-codemerge/plugins/LinkPlugin/public.css";
import "on-codemerge/plugins/ListsPlugin/public.css";
import "on-codemerge/plugins/TablePlugin/public.css";
import "on-codemerge/plugins/AlignmentPlugin/public.css";
import "on-codemerge/plugins/ChartsPlugin/style.css";
import "on-codemerge/plugins/CodeBlockPlugin/style.css";
import "on-codemerge/plugins/ColorPlugin/style.css";
import "on-codemerge/plugins/CommentsPlugin/style.css";
import "on-codemerge/plugins/ExportPlugin/style.css";
import "on-codemerge/plugins/FileUploadPlugin/style.css";
import "on-codemerge/plugins/FooterPlugin/style.css";
import "on-codemerge/plugins/FootnotesPlugin/style.css";
import "on-codemerge/plugins/HistoryPlugin/style.css";
import "on-codemerge/plugins/HTMLViewerPlugin/style.css";
import "on-codemerge/plugins/ImagePlugin/style.css";
import "on-codemerge/plugins/LinkPlugin/style.css";
import "on-codemerge/plugins/ListsPlugin/style.css";
import "on-codemerge/plugins/ResponsivePlugin/style.css";
import "on-codemerge/plugins/ShortcutsPlugin/style.css";
import "on-codemerge/plugins/TablePlugin/style.css";
import "on-codemerge/plugins/TemplatesPlugin/style.css";
import "on-codemerge/plugins/ToolbarPlugin/style.css";
import "on-codemerge/plugins/TypographyPlugin/style.css";
import "on-codemerge/plugins/AlignmentPlugin/style.css";
import React, { useEffect, useRef, useState } from "react";
import { HTMLEditor, ToolbarPlugin, AlignmentPlugin } from "on-codemerge";

const MyEditorComponent = ({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState<HTMLEditor | null>(null);

  useEffect(() => {
    if (editorRef.current && !editor) {
      const newEditor = new HTMLEditor(editorRef.current);

      newEditor.setLocale("ru");

      newEditor.use(new ToolbarPlugin());
      newEditor.use(new AlignmentPlugin());

      newEditor.subscribeToContentChange((newContent) => {
        console.log("Content changed:", newContent);
        if (onValueChange) {
          onValueChange(newContent);
        }
      });

      setEditor(newEditor);
    }

    if (editor && value) {
      editor.setHtml(value);
    }
  }, [editor, value]);

  return <div ref={editorRef}></div>;
};

export default MyEditorComponent;
