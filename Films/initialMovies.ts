import { Movie } from '../types';

export const INITIAL_MOVIES: Movie[] = [
  {
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
  },
  {
    id: "t1",
    title: "The Silent Sea",
    description: "Space explorers try to retrieve samples from an abandoned research facility steeped in classified secrets.",
    matchScore: 95,
    year: 2023,
    ageRating: "TV-14",
    duration: "1h 50m",
    genre: ["Sci-Fi", "Mystery"],
    backdropParams: "space",
    posterParams: "space_poster",
    isOriginal: false
  },
  {
    id: "t2",
    title: "Red Notice",
    description: "An FBI profiler pursues the world's most wanted art thief, who becomes his reluctant partner in crime.",
    matchScore: 89,
    year: 2022,
    ageRating: "PG-13",
    duration: "1h 58m",
    genre: ["Action", "Comedy"],
    backdropParams: "action",
    posterParams: "action_poster",
    isOriginal: false
  },
  {
    id: "t3",
    title: "Arcane",
    description: "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic and technologies.",
    matchScore: 99,
    year: 2024,
    ageRating: "TV-14",
    duration: "2 Seasons",
    genre: ["Animation", "Fantasy"],
    backdropParams: "fantasy",
    posterParams: "fantasy_poster",
    isOriginal: true
  },
  {
    id: "t4",
    title: "Chef's Table: BBQ",
    description: "The critically acclaimed series delves into the smoky, juicy world of barbecue.",
    matchScore: 92,
    year: 2021,
    ageRating: "TV-MA",
    duration: "4 Episodes",
    genre: ["Documentary"],
    backdropParams: "bbq",
    posterParams: "bbq_poster",
    isOriginal: true
  },
  {
    id: "o1",
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    matchScore: 99,
    year: 2022,
    ageRating: "TV-14",
    duration: "4 Seasons",
    genre: ["Horror", "Sci-Fi"],
    backdropParams: "stranger",
    posterParams: "stranger_poster",
    isOriginal: true
  },
  {
    id: "o2",
    title: "The Crown",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    matchScore: 96,
    year: 2023,
    ageRating: "TV-MA",
    duration: "6 Seasons",
    genre: ["Drama", "History"],
    backdropParams: "crown",
    posterParams: "crown_poster",
    isOriginal: true
  }
];
