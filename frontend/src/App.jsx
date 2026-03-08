import { useEffect, useState } from 'react';
import { getItems, createItem, updateItem, deleteItem, toggleItem } from './api';

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  const load = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    await createItem({ name, completed: false });
    setName('');
    load();
  };

  const handleToggle = async (item) => {
  await toggleItem(item.id);  
  load();
};

  const handleDelete = async (id) => {
    await deleteItem(id);
    load();
  };

  const handleEditSave = async (item) => {
    await updateItem(item.id, { ...item, name: editName });
    setEditId(null);
    load();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}> Grocery List</h1>

        {/* ADD ITEM */}
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            placeholder="Add new item..."
          />
          <button style={styles.addBtn} onClick={handleCreate}>Add</button>
        </div>

        {/* LIST */}
        <ul style={styles.list}>
          {items.map(item => (
            <li key={item.id} style={styles.listItem}>

              {/* Checkbox + Name */}
              <div style={styles.left}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggle(item)}
                  style={styles.checkbox}
                />
                {editId === item.id ? (
                  <input
                    style={styles.editInput}
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleEditSave(item)}
                    autoFocus
                  />
                ) : (
                  <span style={{
                    ...styles.itemName,
                    textDecoration: item.completed ? 'line-through' : 'none',
                    color: item.completed ? '#aaa' : '#222',
                  }}>
                    {item.name}
                  </span>
                )}
              </div>

              {/* Edit / Delete Buttons */}
              <div style={styles.right}>
                {editId === item.id ? (
                  <button style={styles.saveBtn} onClick={() => handleEditSave(item)}>💾</button>
                ) : (
                  <button style={styles.editBtn} onClick={() => { setEditId(item.id); setEditName(item.name); }}>✏️</button>
                )}
                <button style={styles.deleteBtn} onClick={() => handleDelete(item.id)}>🗑</button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f0f4f8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '32px',
    width: '480px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
  },
  title: {
    marginBottom: '24px',
    fontSize: '24px',
    color: '#222',
  },
  inputRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1.5px solid #ddd',
    fontSize: '15px',
    outline: 'none',
  },
  addBtn: {
    padding: '10px 20px',
    background: '#00bcd4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderRadius: '10px',
    background: '#f9f9f9',
    border: '1px solid #eee',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#00bcd4',
    cursor: 'pointer',
  },
  itemName: {
    fontSize: '16px',
  },
  editInput: {
    fontSize: '15px',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1.5px solid #00bcd4',
    outline: 'none',
  },
  right: {
    display: 'flex',
    gap: '8px',
  },
  editBtn: {
    padding: '6px 12px',
    background: '#00bcd4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  saveBtn: {
    padding: '6px 12px',
    background: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteBtn: {
    padding: '6px 12px',
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};