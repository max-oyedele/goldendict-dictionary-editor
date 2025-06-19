import { useRef, useState, useEffect } from 'react';
import {
  HTMLEditor,
  BlockPlugin,
  ChartsPlugin,
  CodeBlockPlugin,
  CollaborationPlugin,
  ColorPlugin,
  CommentsPlugin,
  ExportPlugin,
  FileUploadPlugin,
  FooterPlugin,
  FootnotesPlugin,
  HistoryPlugin,
  HTMLViewerPlugin,
  ImagePlugin,
  LinkPlugin,
  ListsPlugin,
  ResponsivePlugin,
  ShortcutsPlugin,
  TablePlugin,
  TemplatesPlugin,
  ToolbarDividerPlugin,
  ToolbarPlugin,
  TypographyPlugin,
  VideoPlugin,
  AlignmentPlugin,
} from 'on-codemerge';

export const EditorComponent = ({ value, onValueChange }: { value: string; onValueChange: React.Dispatch<React.SetStateAction<string>> }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (editorRef.current && !editor) {
      const newEditor = new HTMLEditor(editorRef.current);

      newEditor.setLocale('en');

      newEditor.use(new BlockPlugin());
      newEditor.use(new ChartsPlugin());
      newEditor.use(new CodeBlockPlugin());
      newEditor.use(new CollaborationPlugin());
      newEditor.use(new ColorPlugin());
      newEditor.use(new CommentsPlugin());
      newEditor.use(new ExportPlugin());
      newEditor.use(new FileUploadPlugin());
      newEditor.use(new FooterPlugin());
      newEditor.use(new FootnotesPlugin());
      newEditor.use(new HistoryPlugin());
      newEditor.use(new HTMLViewerPlugin());
      newEditor.use(new ImagePlugin());
      newEditor.use(new LinkPlugin());
      newEditor.use(new ListsPlugin());
      newEditor.use(new ResponsivePlugin());
      newEditor.use(new ShortcutsPlugin());
      newEditor.use(new TablePlugin());
      newEditor.use(new TemplatesPlugin());
      newEditor.use(new ToolbarDividerPlugin());
      newEditor.use(new ToolbarPlugin());
      newEditor.use(new TypographyPlugin());
      newEditor.use(new VideoPlugin());
      newEditor.use(new AlignmentPlugin());

      newEditor.subscribeToContentChange((newContent) => {
        console.log('Content changed:', newContent);
        onValueChange(newContent);
      });

      setEditor(newEditor);
    }

    if (editor && value) {
      editor.setHtml(value);
    }
  }, [editor, value]);

  return <div ref={editorRef}></div>;
};
