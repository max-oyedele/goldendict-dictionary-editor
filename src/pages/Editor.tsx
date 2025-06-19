import React, { useState, useEffect, useRef } from 'react';
import { SideBar } from '@components/editor/SideBar';
import { EditorComponent } from '@components/editor/Editor';
import '@styles/on-codemerge.css';
import '@styles/ResizableSidebar.scss';

const Editor = () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  const [value, setValue] = useState<string>('');

  return (
    <div className="editor-wrapper">
      {/* <SideBar items={items} onSelect={(item) => alert(item)} /> */}
      {/* <EditorComponent
        value={value}
        onValueChange={(newValue) => {
          console.log('new value=', newValue);
        }}
      /> */}
      <ResizableSidebarLayout
        sidebarContent={<SideBar items={items} onSelect={(item) => alert(item)} />}
        children={
          <EditorComponent
            value={value}
            onValueChange={(newValue) => {
              console.log('new value=', newValue);
            }}
          />
        }
      />
    </div>
  );
};

export default Editor;

const ResizableSidebarLayout = ({ children, sidebarContent }) => {
  const [sidebarWidth, setSidebarWidth] = useState(150); // initial width in px
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    setSidebarWidth(Math.max(150, e.clientX)); // minimum width 150px
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = '';
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return (
    <div className="resizable-layout">
      <div className="sidebar" style={{ width: sidebarWidth }}>
        {sidebarContent}
      </div>
      <div className="resizer" onMouseDown={handleMouseDown} style={{ left: sidebarWidth }} />
      <div className="main-content">{children}</div>
    </div>
  );
};
