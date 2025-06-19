import React, { useState } from 'react';
import '@styles/Sidebar.scss';

export const SideBar = ({ items, onSelect }) => {
  const [search, setSearch] = useState('');
  const filteredItems = items.filter((item) => item.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <input className="sidebar-search" type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <ul>
        {filteredItems.map((item, idx) => (
          <li key={idx} onClick={() => onSelect(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
