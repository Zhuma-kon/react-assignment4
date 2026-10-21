import React from 'react';

export default function MovieCard({ movie, onSelectMovie }) {
  return (
    <div 
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        backgroundColor: '#fff',
        transition: 'transform 0.2s'
      }}
      onClick={() => onSelectMovie(movie)}
    >
      <img 
        src={movie.poster} 
        alt={movie.title} 
        style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
      />
      <div style={{ padding: '12px' }}>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#1a202c' }}>{movie.title}</h3>
        <p style={{ margin: '0 0 6px 0', color: '#718096', fontSize: '0.85rem' }}>
          {movie.genre} • {movie.year}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#e50914' }}>
            ⭐ {movie.rating}
          </span>
          <span style={{ 
            fontSize: '0.75rem', 
            padding: '2px 6px', 
            borderRadius: '4px',
            backgroundColor: movie.watched ? '#e6fffa' : '#fff5f5',
            color: movie.watched ? '#234e52' : '#9b2c2c'
          }}>
            {movie.watched ? 'Watched' : 'Watchlist'}
          </span>
        </div>
      </div>
    </div>
  );
}