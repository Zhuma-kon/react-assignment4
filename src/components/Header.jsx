import React from 'react';

export default function Header({ totalCount, watchedCount }) {
  return (
    <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1 style={{ color: '#e50914', margin: 0 }}>🎬 CineWatch Tracker</h1>
        <p style={{ color: '#718096', margin: '4px 0 0 0' }}>Manage your movie collection and watchlist</p>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <span style={{ background: '#edf2f7', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
          Total: {totalCount}
        </span>
        <span style={{ background: '#e6fffa', color: '#234e52', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
          Watched: {watchedCount}
        </span>
      </div>
    </header>
  );
}