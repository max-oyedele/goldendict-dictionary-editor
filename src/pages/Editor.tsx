import React, { useState, useEffect, useRef } from 'react';
import { SideBar } from '@components/editor/SideBar';
import { EditorComponent } from '@components/editor/Editor';
import '@styles/on-codemerge.css';
import '@styles/ResizableSidebar.scss';
import { EntryItem } from '@types';
import { SideBarInitialWidth } from '@configs/editor';

const Editor = () => {
  const items: EntryItem[] = [];
  const [value, setValue] = useState<string>('');

  return (
    <ResizableSidebarLayout
      sidebarContent={<SideBar items={items} onSelect={(item) => alert(item)} onCreate={() => {}} onUpdate={() => {}} onDelete={() => {}} />}
      children={
        <EditorComponent
          value={value}
          onValueChange={(newValue) => {
            console.log('new value=', newValue);
          }}
        />
      }
    />
  );
};

export default Editor;

const ResizableSidebarLayout = ({ children, sidebarContent }) => {
  const [sidebarWidth, setSidebarWidth] = useState(SideBarInitialWidth); // initial width in px
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    setSidebarWidth(Math.max(SideBarInitialWidth, e.clientX)); // minimum width
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
