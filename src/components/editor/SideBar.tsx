import React, { useState } from 'react';
import '@styles/Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

export const SideBar = ({ items, onSelect, onCreate, onUpdate, onDelete, selectedItem, onLoad }) => {
  const [search, setSearch] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newItem, setNewItem] = useState({ term: '', article: '' });
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateItem, setUpdateItem] = useState({ term: '', article: '' });

  const filteredItems = items.filter((item) => item.term.toLowerCase().includes(search.toLowerCase())).sort((a, b) => a.term.localeCompare(b.term));

  const handleSelect = (item) => {
    onSelect(item);
  };

  const handleCreate = () => {
    setShowCreateDialog(true);
    setNewItem({ term: '', article: '' });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (newItem.term.trim()) {
      onCreate(newItem);
      setShowCreateDialog(false);
    }
  };

  const handleCreateCancel = () => {
    setShowCreateDialog(false);
  };

  const handleUpdate = () => {
    if (selectedItem) {
      setUpdateItem({ ...selectedItem });
      setShowUpdateDialog(true);
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (updateItem.term.trim()) {
      onUpdate(updateItem);
      setShowUpdateDialog(false);
    }
  };

  const handleUpdateCancel = () => {
    setShowUpdateDialog(false);
  };

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <div>
      <div className="sidebar-actions">
        <div>
          <button type="button" onClick={handleLoad} title="Load">
            <FontAwesomeIcon icon={faFolderOpen} />
          </button>
        </div>
        <div>
          <button type="button" onClick={handleCreate} title="Create">
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button type="button" onClick={handleUpdate} disabled={!selectedItem} title="Update">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (selectedItem && onDelete) {
                if (window.confirm(`Are you sure you want to delete "${selectedItem.term}"?`)) {
                  onDelete(selectedItem);
                }
              }
            }}
            disabled={!selectedItem}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <div className="sidebar-search-box">
        <input className="sidebar-search" type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="list-box">
        <ul>
          {filteredItems.map((item, idx) => (
            <li key={idx} onClick={() => handleSelect(item)} className={selectedItem && selectedItem.term === item.term ? 'selected' : ''}>
              {item.term}
            </li>
          ))}
        </ul>
      </div>
      {showCreateDialog && (
        <div className="modal-overlay" onClick={handleCreateCancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleCreateSubmit}>
              <div>
                <label>Term:</label>
                <input type="text" value={newItem.term} onChange={(e) => setNewItem({ ...newItem, term: e.target.value })} required />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={handleCreateCancel}>
                  Cancel
                </button>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showUpdateDialog && (
        <div className="modal-overlay" onClick={handleUpdateCancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label>Term:</label>
                <input type="text" value={updateItem.term} onChange={(e) => setUpdateItem({ ...updateItem, term: e.target.value })} required />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={handleUpdateCancel}>
                  Cancel
                </button>
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
