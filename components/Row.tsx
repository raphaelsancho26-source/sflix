import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';

interface RowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  isLarge?: boolean;
}

const Row: React.FC<RowProps> = ({ title, movies, onMovieClick, isLarge = false }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 md:mb-12 relative group px-4 md:px-12">
      <h2 className="text-white text-lg md:text-2xl font-semibold mb-3 hover:text-gray-300 cursor-pointer transition w-fit">
        {title}
      </h2>

      <div className="relative group/row">
        {/* Left Arrow */}
        <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-40 bg-black/50 w-12 hover:bg-black/70 hidden md:group-hover/row:flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 rounded-r"
        >
            <ChevronLeft className="text-white" size={32} />
        </button>

        {/* Scroll Container */}
        <div 
          ref={rowRef}
          className="flex overflow-x-scroll gap-2 md:gap-4 no-scrollbar scroll-smooth py-4 pl-1"
        >
          {movies.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => onMovieClick(movie)}
              className={`relative flex-none transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 hover:z-20
                ${isLarge ? 'w-40 md:w-56 h-60 md:h-80' : 'w-36 md:w-48 h-24 md:h-32'}`}
            >
              <img
                src={`https://picsum.photos/seed/${isLarge ? movie.posterParams : movie.backdropParams}/500/${isLarge ? 800 : 300}`}
                alt={movie.title}
                className={`w-full h-full object-cover rounded-md shadow-lg ${isLarge ? 'object-top' : 'object-center'}`}
                loading="lazy"
              />
              {/* Mini Overlay on Hover (optional polish) */}
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-md"></div>
              
              {/* Original Badge */}
              {movie.isOriginal && isLarge && (
                  <div className="absolute top-2 right-2">
                       <span className="text-[10px] font-bold text-red-600 bg-black/80 px-1 rounded border border-red-600">S</span>
                  </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-40 bg-black/50 w-12 hover:bg-black/70 hidden md:group-hover/row:flex items-center justify-center transition-all opacity-0 group-hover/row:opacity-100 rounded-l"
        >
            <ChevronRight className="text-white" size={32} />
        </button>
      </div>
    </div>
  );
};

export default Row;
