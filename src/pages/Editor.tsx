import React, { useState, useEffect, useRef } from 'react';
import { SideBar } from '@components/editor/SideBar';
import { EditorComponent } from '@components/editor/Editor';
import '@styles/on-codemerge.css';
import '@styles/ResizableSidebar.scss';
import { EntryItem } from '@types';
import { SideBarInitialWidth } from '@configs/editor';

const Editor = () => {
  const [items, setItems] = useState<EntryItem[]>([]);

  const [selectedItem, setSelectedItem] = useState<EntryItem | null>(null);

  const handleCreate = (newItem: EntryItem) => {
    setItems((prev) => [...prev, newItem]);
    setSelectedItem(newItem);
  };

  const handleSelect = (item: EntryItem) => {
    setSelectedItem(item);
  };

  const handleDelete = (itemToDelete: EntryItem) => {
    setItems((prev) => prev.filter((item) => item !== itemToDelete));
    setSelectedItem(null);
  };

  const handleUpdate = (updatedItem: EntryItem) => {
    setItems((prev) => prev.map((item) => (item.term === selectedItem.term ? { ...item, ...updatedItem } : item)));
    setSelectedItem(updatedItem);
  };

  const handleLoad = async () => {
    const content = await window.electron.openReadFileDialog();
    if (content) {
      setItems(JSON.parse(content));
    }
  };

  return (
    <ResizableSidebarLayout
      sidebarContent={
        <SideBar items={items} onSelect={handleSelect} onCreate={handleCreate} onUpdate={handleUpdate} onDelete={handleDelete} selectedItem={selectedItem} onLoad={handleLoad} />
      }
      children={<EditorComponent items={items} setItems={setItems} selectedItem={selectedItem} />}
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
