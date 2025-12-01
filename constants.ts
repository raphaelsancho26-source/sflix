import { Movie, CategoryRow } from './types';

// Fallback empty, now loaded from Films/initialMovies in App state
export const INITIAL_ROWS: CategoryRow[] = []; 
export const MOCK_HERO_MOVIE: Movie = {
  id: "hero-1",
  title: "Cyberpunk: Neon Dawn",
  description: "In a future where memories are currency, a rogue data-thief uncovers a conspiracy that threatens to overwrite humanity's collective consciousness.",
  matchScore: 98,
  year: 2024,
  ageRating: "TV-MA",
  duration: "1 Seasons",
  genre: ["Sci-Fi", "Action", "Thriller"],
  backdropParams: "cyberpunk",
  posterParams: "cyberpunk_poster",
  isOriginal: true
};
