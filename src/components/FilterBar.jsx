import React from 'react';

export default function FilterBar({ 
  searchTerm, setSearchTerm, 
  selectedGenre, setSelectedGenre, 
  sortBy, setSortBy, 
  totalResults 
}) {
  const genres = ["All", "Action", "Sci-Fi", "Drama", "Comedy", "Thriller", "Animation"];

  return (
    <div style={{ 
      background: '#f8fafc', 
      padding: '15px', 
      borderRadius: '8px', 
      marginBottom: '20px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid #e2e8f0'
    }}>
      <div>
        <input 
          type="text" 
          placeholder="Search movies..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', width: '220px' }}
        />
      </div>

      <div>
        <label style={{ marginRight: '8px', fontSize: '0.9rem', fontWeight: 'bold', color: '#475569' }}>Genre:</label>
        <select 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        >
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div>
        <label style={{ marginRight: '8px', fontSize: '0.9rem', fontWeight: 'bold', color: '#475569' }}>Sort By:</label>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        >
          <option value="title">Title (A-Z)</option>
          <option value="rating-high">Highest Rating ⭐</option>
          <option value="year-new">Newest Year 📅</option>
        </select>
      </div>

      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
        Found: <strong>{totalResults}</strong> movies
      </div>
    </div>
  );
}