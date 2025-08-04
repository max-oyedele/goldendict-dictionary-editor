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
  FontPlugin,
  FooterPlugin,
  FootnotesPlugin,
  HistoryPlugin,
  HTMLViewerPlugin,
  ImagePlugin,
  LinkPlugin,
  ListsPlugin,
  MathPlugin,
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
import { EntryItem } from '@types';
import '@styles/Editor.scss';

export const EditorComponent = ({
  items,
  setItems,
  selectedItem,
}: {
  items: EntryItem[];
  setItems: React.Dispatch<React.SetStateAction<EntryItem[]>>;
  selectedItem: EntryItem;
}) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState<HTMLEditor>(null);

  useEffect(() => {
    if (editorRef.current && !editor) {
      const newEditor = new HTMLEditor(editorRef.current);

      newEditor.setLocale('en');

      newEditor.use(new ToolbarPlugin());

      newEditor.use(new HistoryPlugin());
      newEditor.use(new ToolbarDividerPlugin());

      newEditor.use(new FontPlugin());
      newEditor.use(new AlignmentPlugin());
      newEditor.use(new ToolbarDividerPlugin());

      //   newEditor.use(new BlockPlugin());
      //   newEditor.use(new CodeBlockPlugin());
      //   newEditor.use(new CollaborationPlugin());
      newEditor.use(new TypographyPlugin());
      newEditor.use(new ColorPlugin());
      newEditor.use(new CommentsPlugin());
      newEditor.use(new ToolbarDividerPlugin());

      //   newEditor.use(new ExportPlugin());
      //   newEditor.use(new FileUploadPlugin());
      //   newEditor.use(new FooterPlugin());
      //   newEditor.use(new FootnotesPlugin());
      //   newEditor.use(new HTMLViewerPlugin());
      newEditor.use(new ListsPlugin());
      newEditor.use(new TablePlugin());
      newEditor.use(new ImagePlugin());
      newEditor.use(new VideoPlugin());
      newEditor.use(new LinkPlugin());
      newEditor.use(new ChartsPlugin());
      newEditor.use(new MathPlugin());
      newEditor.use(new ToolbarDividerPlugin());
      // newEditor.use(new ResponsivePlugin());
      // newEditor.use(new ShortcutsPlugin());
      //   newEditor.use(new TemplatesPlugin());

      newEditor.subscribeToContentChange((newContent) => {
        console.log(newContent);
      });

      setEditor(newEditor);
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.setHtml(selectedItem?.article || '');
    }
  }, [editor, selectedItem?.term]);

  const handleSaveAsTerm = () => {
    setItems((prev) => prev.map((item) => (item.term === selectedItem.term ? { ...item, article: editor.getHtml() } : item)));
  };

  const handleExportToFile = () => {
    const dictString = items.reduce((acc, item) => {
      // apple<TAB><div><p>Apple</p></div>
      //
      // banana<TAB><div><p>Banana</p></div>
      acc += `${item.term}\t${item.article.replace(/\s*\n\s*/g, '')}\n\n`;
      return acc;
    }, '');
    console.log('dict string=\n', dictString);

    window.electron.writeFile('dict.txt', dictString);
    window.electron.writeFile('items.json', JSON.stringify(items, null, 2));
  };

  return (
    <div id="eidtor">
      <div id="main-editor" ref={editorRef}></div>
      <div className="editor-button-box">
        <button onClick={handleSaveAsTerm}>Save as Term</button>
        <button onClick={handleExportToFile}>Export to File</button>
      </div>
    </div>
  );
};
