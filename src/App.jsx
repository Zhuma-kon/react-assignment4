import { useState, useEffect } from 'react';
import { fakeApiCall } from './utils/api';

export default function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Selection and Details state
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  // Form states for Create & Edit
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Action');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState(2024);
  const [rating, setRating] = useState(7.5);
  const [editingId, setEditingId] = useState(null); // null means creating, number means editing

  // 1. Load item list using useEffect with error/loading/success handling
  const loadItems = () => {
    setIsLoading(true);
    setError(null);
    fakeApiCall('GET_ALL')
      .then(data => {
        setItems(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadItems();
  }, []);

  // 2. Load Item Details asynchronously with Race Condition & Stale Closure protection
  useEffect(() => {
    if (!selectedId) {
      setSelectedDetails(null);
      return;
    }

    let isCancelled = false; // Prevents race conditions on rapid switching
    const currentCapturedId = selectedId; // Handles stale closures

    setIsDetailsLoading(true);
    setSelectedDetails(null);

    fakeApiCall('GET_DETAILS', { id: currentCapturedId })
      .then(details => {
        if (!isCancelled) {
          setSelectedDetails(details);
          setIsDetailsLoading(false);
        }
      })
      .catch(err => {
        if (!isCancelled) {
          setError(err.message);
          setIsDetailsLoading(false);
        }
      });

    return () => {
      isCancelled = true; // Cleanup flag
    };
  }, [selectedId]);

  // 3. Handle Create or Edit submission
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!title.trim() || !director.trim()) return;

    if (editingId) {
      // Edit Action
      fakeApiCall('UPDATE', { 
        id: editingId, 
        updates: { title, genre, director, year: Number(year), rating: Number(rating) } 
      })
        .then(updatedItems => {
          setItems(updatedItems);
          resetForm();
        })
        .catch(err => setError(err.message));
    } else {
      // Create Action
      fakeApiCall('CREATE', {
        title,
        genre,
        director,
        year: Number(year),
        rating: Number(rating),
        runtime: 120,
        description: `Description for ${title}`,
        poster: `https://picsum.photos/seed/${Date.now()}/300/450`,
        watched: false
      })
        .then(newItems => {
          setItems(newItems);
          resetForm();
        })
        .catch(err => setError(err.message));
    }
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setGenre(item.genre);
    setDirector(item.director);
    setYear(item.year);
    setRating(item.rating);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDirector('');
    setYear(2024);
    setRating(7.5);
  };

  // 4. Remove functionality
  const handleDelete = (id, e) => {
    e.stopPropagation();
    fakeApiCall('DELETE', { id })
      .then(newItems => {
        setItems(newItems);
        if (selectedId === id) setSelectedId(null);
      })
      .catch(err => setError(err.message));
  };

  // 5. Update Status action (e.g., toggle watched status)
  const handleToggleStatus = (id, currentStatus, e) => {
    e.stopPropagation();
    fakeApiCall('UPDATE', { id, updates: { watched: !currentStatus } })
      .then(updatedItems => {
        setItems(updatedItems);
        if (selectedDetails && selectedDetails.id === id) {
          setSelectedDetails(prev => ({ ...prev, watched: !prev.watched }));
        }
      })
      .catch(err => setError(err.message));
  };

  // Error State UI
  if (error && items.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#e50914' }}>⚠️ Error: {error}</h2>
        <button onClick={loadItems} style={{ padding: '10px 20px', cursor: 'pointer' }}>Try Again</button>
      </div>
    );
  }

  // Loading State UI
  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <h2>Loading Asynchronous Data... ⏳</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
        <h1 style={{ color: '#e50914', margin: 0 }}>📦 Async Item Manager (Task 4)</h1>
        {/* Reload Button Requirement */}
        <button 
          onClick={loadItems}
          style={{ padding: '8px 16px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          🔄 Reload List
        </button>
      </header>

      {error && <p style={{ color: 'orange', background: '#fffaf0', padding: '10px' }}>⚠️ Notice: {error}</p>}

      {/* Create / Edit Form Requirement */}
      <form onSubmit={handleSubmitForm} style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', margin: '20px 0', border: '1px solid #cbd5e1' }}>
        <h3>{editingId ? '✏️ Edit Item' : '➕ Create New Item'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '10px' }}>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ padding: '8px' }} />
          <input type="text" placeholder="Director" value={director} onChange={e => setDirector(e.target.value)} required style={{ padding: '8px' }} />
          <select value={genre} onChange={e => setGenre(e.target.value)} style={{ padding: '8px' }}>
            {["Action", "Sci-Fi", "Drama", "Comedy", "Thriller", "Animation"].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <input type="number" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} style={{ padding: '8px' }} />
          <input type="number" step="0.1" min="1" max="10" placeholder="Rating" value={rating} onChange={e => setRating(e.target.value)} style={{ padding: '8px' }} />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '8px 16px', background: '#38a169', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {editingId ? 'Update Item' : 'Add Item'}
          </button>
          {editingId && <button type="button" onClick={resetForm} style={{ padding: '8px 16px', background: '#718096', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>}
        </div>
      </form>

      {/* Main Layout: List & Details Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Item List / Empty State Requirement */}
        <div>
          <h3>Items List ({items.length})</h3>
          {items.length === 0 ? (
            <p style={{ color: '#a0aec0' }}>No items found (Empty State).</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '450px', overflowY: 'auto' }}>
              {items.map(item => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  style={{ 
                    padding: '12px', 
                    background: selectedId === item.id ? '#ebf8ff' : '#fff', 
                    border: '1px solid #cbd5e1', 
                    borderRadius: '6px', 
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{item.title} ({item.year})</strong>
                    <span style={{ fontSize: '0.8rem', background: item.watched ? '#c6f6d5' : '#feebcb', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.watched ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                  <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#4a5568' }}>{item.genre} | ⭐ {item.rating}</p>
                  
                  {/* Action buttons (Edit, Delete, Status Toggle) */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button onClick={(e) => handleToggleStatus(item.id, item.watched, e)} style={{ fontSize: '0.75rem', padding: '3px 6px' }}>
                      {item.watched ? 'Mark Pending' : 'Mark Complete'}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleStartEdit(item); }} style={{ fontSize: '0.75rem', padding: '3px 6px' }}>Edit</button>
                    <button onClick={(e) => handleDelete(item.id, e)} style={{ fontSize: '0.75rem', padding: '3px 6px', background: '#e53e3e', color: '#fff', border: 'none', borderRadius: '3px' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Extended Details Panel (Async loading & Race Condition proof) */}
        <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3>🔍 Item Extended Details</h3>
          {!selectedId ? (
            <p style={{ color: '#a0aec0' }}>Select an item from the list to view asynchronous details.</p>
          ) : isDetailsLoading ? (
            <p>Loading extended details asynchronously... ⏳</p>
          ) : selectedDetails ? (
            <div>
              <h2>{selectedDetails.title}</h2>
              <p><strong>Director:</strong> {selectedDetails.director}</p>
              <p><strong>Genre:</strong> {selectedDetails.genre} ({selectedDetails.year})</p>
              <p><strong>Rating:</strong> ⭐ {selectedDetails.rating}/10</p>
              <p><strong>Runtime:</strong> {selectedDetails.runtime} mins</p>
              <hr style={{ border: '0', borderTop: '1px solid #cbd5e1', margin: '10px 0' }} />
              <p><strong>Extended Synopsis:</strong> {selectedDetails.detailedSynopsis}</p>
              <p><strong>Production Studio:</strong> {selectedDetails.studio}</p>
              <p><strong>Budget:</strong> {selectedDetails.budget}</p>
              <p><strong>Box Office:</strong> {selectedDetails.boxOffice}</p>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}