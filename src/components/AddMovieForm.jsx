import React, { useState } from 'react';

export default function AddMovieForm({ onAddMovie }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Action');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState(2024);
  const [rating, setRating] = useState(7.5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !director.trim()) return;

    const newMovie = {
      id: Date.now(), // Unique ID
      title,
      genre,
      director,
      year: Number(year),
      rating: Number(rating),
      runtime: 120,
      description: `Custom user-added movie directed by ${director}.`,
      poster: `https://picsum.photos/seed/custom_${Date.now()}/300/450`,
      watched: false
    };

    onAddMovie(newMovie);

    // Reset form fields
    setTitle('');
    setDirector('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        background: '#f8fafc',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#1a202c' }}>➕ Add New Movie to Watchlist</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Movie Title..." 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
        <input 
          type="text" 
          placeholder="Director Name..." 
          value={director} 
          onChange={(e) => setDirector(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
        <select 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        >
          {["Action", "Sci-Fi", "Drama", "Comedy", "Thriller", "Animation"].map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Year" 
          value={year} 
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
        <input 
          type="number" 
          step="0.1" 
          min="1" 
          max="10" 
          placeholder="Rating (1-10)" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
      </div>

      <button 
        type="submit"
        style={{
          padding: '10px',
          background: '#e50914',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          alignSelf: 'flex-start'
        }}
      >
        Add Movie
      </button>
    </form>
  );
}