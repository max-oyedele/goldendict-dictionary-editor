import React from 'react';

export const SideBar = ({ items, onSelect }) => (
  <div className="editor-sidebar">
    <ul>
      {items.map((item, idx) => (
        <li key={idx} onClick={() => onSelect(item)}>
          {item}
        </li>
      ))}
    </ul>
  </div>
);
