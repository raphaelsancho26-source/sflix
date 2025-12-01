export interface Movie {
  id: string;
  title: string;
  description: string;
  matchScore: number; // e.g., 98 for "98% Match"
  year: number;
  ageRating: string;
  duration: string;
  genre: string[];
  backdropParams: string; // seed for picsum
  posterParams: string; // seed for picsum
  isOriginal?: boolean;
}

export interface CategoryRow {
  title: string;
  movies: Movie[];
}

export interface UserProfile {
  id: string;
  name: string;
  avatarColor: string; // Tailwind class like 'bg-blue-600'
  isKid?: boolean;
  myList: Movie[];
}

export enum AppView {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  PLAYER = 'PLAYER',
  MY_LIST = 'MY_LIST',
  FILMS = 'FILMS'
}