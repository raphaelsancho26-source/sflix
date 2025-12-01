import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Movie } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Define the schema for a single movie
const movieSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    matchScore: { type: Type.INTEGER },
    year: { type: Type.INTEGER },
    ageRating: { type: Type.STRING },
    duration: { type: Type.STRING },
    genre: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    isOriginal: { type: Type.BOOLEAN }
  },
  required: ["id", "title", "description", "matchScore", "year", "ageRating", "duration", "genre"]
};

// Define the schema for a list of movies
const movieListSchema: Schema = {
  type: Type.ARRAY,
  items: movieSchema
};

export const fetchRecommendedMovies = async (query: string): Promise<Movie[]> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return [];
  }

  try {
    const prompt = `
      You are an engine for a streaming service called SFLIX. 
      Generate a list of 6 fictional or real movie/series recommendations based on this user search/mood: "${query}".
      Make them sound exciting.
      For 'id', use a short unique string.
      For 'matchScore', give a number between 70 and 99.
      For 'ageRating', use standard ratings like TV-MA, PG-13, R.
      For 'duration', use format like "1h 45m" or "2 Seasons".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: movieListSchema,
        temperature: 0.7
      }
    });

    const text = response.text;
    if (!text) return [];

    const data = JSON.parse(text) as Omit<Movie, 'backdropParams' | 'posterParams'>[];
    
    // Add image seeds
    return data.map((m, index) => ({
      ...m,
      backdropParams: `movie_${m.id}_bg_${index}`,
      posterParams: `movie_${m.id}_poster_${index}`
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};

export const fetchCategoryMovies = async (category: string): Promise<Movie[]> => {
  if (!apiKey) return [];

  try {
    const prompt = `
      Generate 8 unique, creative fictional movie or series titles for the category: "${category}".
      If the category is "SFLIX Originals", make them sound prestigious and high-budget.
      For 'id', use a random string.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: movieListSchema,
        temperature: 0.8
      }
    });

    const text = response.text;
    if (!text) return [];

    const data = JSON.parse(text) as Omit<Movie, 'backdropParams' | 'posterParams'>[];

    return data.map((m, index) => ({
      ...m,
      backdropParams: `${category.replace(/\s/g, '')}_${index}_bg`,
      posterParams: `${category.replace(/\s/g, '')}_${index}_poster`
    }));

  } catch (error) {
    console.error("Gemini Category Fetch Error:", error);
    return [];
  }
};
