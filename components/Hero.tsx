import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onPlay: () => void;
  onMoreInfo: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay, onMoreInfo }) => {
  return (
    <div className="relative h-[56.25vw] max-h-[85vh] w-full bg-zinc-900">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full">
         <img 
            src={`https://picsum.photos/seed/${movie.backdropParams}/1920/1080`} 
            alt={movie.title}
            className="w-full h-full object-cover opacity-70"
         />
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#141414] to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute top-[30%] md:top-[40%] left-4 md:left-12 max-w-xl text-white z-10">
        {movie.isOriginal && (
          <div className="flex items-center gap-1 mb-2 md:mb-4">
             <span className="text-red-600 font-bold text-xs md:text-sm tracking-widest uppercase">SFLIX</span>
             <span className="text-gray-300 text-xs md:text-sm tracking-widest uppercase">ORIGINAL</span>
          </div>
        )}
        <h1 className="text-3xl md:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight">
          {movie.title}
        </h1>
        <div className="flex items-center gap-3 mb-4 text-sm md:text-base font-medium">
            <span className="text-green-400">{movie.matchScore}% Match</span>
            <span className="text-gray-300">{movie.year}</span>
            <span className="border border-gray-500 px-1 text-xs rounded text-gray-300">{movie.ageRating}</span>
        </div>
        <p className="text-sm md:text-lg text-gray-200 mb-6 drop-shadow-md line-clamp-3 md:line-clamp-none">
          {movie.description}
        </p>
        
        <div className="flex gap-3">
          <button 
            onClick={onPlay}
            className="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded flex items-center gap-2 font-bold hover:bg-opacity-80 transition"
          >
            <Play size={24} fill="black" />
            Play
          </button>
          <button 
            onClick={() => onMoreInfo(movie)}
            className="bg-gray-500/70 text-white px-6 py-2 md:px-8 md:py-3 rounded flex items-center gap-2 font-bold hover:bg-opacity-50 transition backdrop-blur-sm"
          >
            <Info size={24} />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
