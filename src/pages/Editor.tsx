import React, { useState } from 'react';
import { SideBar } from '@components/editor/SideBar';
import { EditorComponent } from '@components/editor/Editor';
import '@styles/on-codemerge.css';

const Editor = () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  const [value, setValue] = useState<string>('');

  return (
    <div className="editor-wrapper">
      <SideBar items={items} onSelect={(item) => alert(item)} />
      <EditorComponent
        value={value}
        onValueChange={(newValue) => {
          console.log('new value=', newValue);
        }}
      />
    </div>
  );
};

export default Editor;
