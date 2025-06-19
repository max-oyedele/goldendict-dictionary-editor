import React, { useState } from 'react';
import { EditorComponent } from '@components/editor/Editor';

const Editor = () => {
  const [value, setValue] = useState<string>('');
  return <EditorComponent value={value} onValueChange={(newValue) => {
    console.log("new value=", newValue);
  }} />;
};

export default Editor;
