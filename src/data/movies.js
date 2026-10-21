// src/data/movies.js

const genres = ["Action", "Sci-Fi", "Drama", "Comedy", "Thriller", "Animation"];
const directors = ["Christopher Nolan", "Denis Villeneuve", "Quentin Tarantino", "Greta Gerwig", "Bong Joon-ho", "David Fincher"];

export const initialMovies = Array.from({ length: 105 }, (_, i) => {
  const id = i + 1;
  const genre = genres[i % genres.length];
  const director = directors[i % directors.length];
  const year = 1995 + (i % 31);
  const rating = (6.0 + (i % 38) / 10).toFixed(1);

  return {
    id: id,
    title: `Blockbuster Feature Film #${id}`,
    genre: genre,
    director: director,
    year: year,
    rating: parseFloat(rating),
    runtime: 110 + (i % 45),
    description: `An acclaimed ${genre.toLowerCase()} movie directed by ${director}, released in ${year}. Is fun.`,
    poster: `https://picsum.photos/seed/movieposter${id}/300/450`,
    watched: i % 3 === 0
  };
});