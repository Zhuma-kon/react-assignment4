import React from 'react';

export default function MovieModal({ movie, onClose, onToggleWatched }) {
  if (!movie) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', maxWidth: '450px', width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        <h2 style={{ marginTop: 0 }}>{movie.title}</h2>
        <p><strong>Genre:</strong> {movie.genre} ({movie.year})</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Runtime:</strong> {movie.runtime} mins</p>
        <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
        <p style={{ color: '#4a5568', lineHeight: '1.5' }}>{movie.description}</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button 
            onClick={() => onToggleWatched(movie.id)}
            style={{ 
              padding: '8px 16px', 
              background: movie.watched ? '#e53e3e' : '#38a169', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: 'bold' 
            }}
          >
            {movie.watched ? 'Mark as Unwatched' : 'Mark as Watched ✓'}
          </button>
          
          <button 
            onClick={onClose}
            style={{ padding: '8px 16px', background: '#718096', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}