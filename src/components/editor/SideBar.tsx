import React, { useState } from 'react';
import '@styles/Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export const SideBar = ({ items, onSelect, onCreate, onUpdate, onDelete }) => {
  const [search, setSearch] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const filteredItems = items.filter((item) => item.term.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (item, idx) => {
    setSelectedIdx(idx);
    onSelect(item);
  };

  const selectedItem = filteredItems[selectedIdx] || null;

  return (
    <div>
      <div className="sidebar-actions">
        <button type="button" onClick={onCreate} title="Create">
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button type="button" onClick={() => onUpdate && selectedItem && onUpdate(selectedItem)} disabled={!selectedItem} title="Update">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button type="button" onClick={() => onDelete && selectedItem && onDelete(selectedItem)} disabled={!selectedItem} title="Delete">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className="sidebar-search-box">
        <input className="sidebar-search" type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="list-box">
        <ul>
          {filteredItems.map((item, idx) => (
            <li key={idx} onClick={() => handleSelect(item, idx)} className={selectedIdx === idx ? 'selected' : ''}>
              {item.term}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
