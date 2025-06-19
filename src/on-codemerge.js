import "on-codemerge/public.css";
import "on-codemerge/index.css";
import "on-codemerge/plugins/ToolbarPlugin/style.css";
import "on-codemerge/plugins/AlignmentPlugin/public.css";
import "on-codemerge/plugins/AlignmentPlugin/style.css";
import { HTMLEditor, ToolbarPlugin, AlignmentPlugin } from "on-codemerge";

document.addEventListener("DOMContentLoaded", async () => {
  const editorElement = document.getElementById("editor");
  if (editorElement) {
    const editor = new HTMLEditor(editorElement);

    await editor.setLocale("ru");

    editor.use(new ToolbarPlugin());
    editor.use(new AlignmentPlugin());

    editor.subscribeToContentChange((newContent) => {
      console.log("Content changed:", newContent);
    });

    editor.setHtml("Initial content goes here");
    console.log(editor.getHtml());
  }
});
