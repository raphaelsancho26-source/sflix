import React from 'react';
import { Plus, Edit } from 'lucide-react';
import { Movie } from '../types';

interface FilmsViewProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onAddClick: () => void;
  onEditClick: (movie: Movie) => void;
}

const FilmsView: React.FC<FilmsViewProps> = ({ movies, onMovieClick, onAddClick, onEditClick }) => {
  return (
    <div className="min-h-screen pt-24 px-4 md:px-12 bg-[#141414]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white">All Films & Series</h1>
        <button 
          onClick={onAddClick}
          className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 font-bold hover:bg-red-700 transition shadow-lg"
        >
          <Plus size={20} /> Add New
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Add Card (Visual shortcut) */}
        <div 
          onClick={onAddClick}
          className="relative group cursor-pointer border-2 border-dashed border-gray-700 rounded-md flex flex-col items-center justify-center min-h-[250px] hover:border-gray-500 transition-colors"
        >
            <div className="bg-gray-800 p-4 rounded-full mb-4 group-hover:bg-gray-700 transition-colors">
                 <Plus size={32} className="text-gray-400 group-hover:text-white" />
            </div>
            <span className="text-gray-500 font-medium group-hover:text-gray-300">Add Title</span>
        </div>

        {movies.map(movie => (
          <div 
            key={movie.id} 
            className="relative group cursor-pointer bg-[#181818] rounded-md overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg"
            onClick={() => onMovieClick(movie)}
          >
            <div className="relative aspect-[2/3]">
              <img 
                src={`https://picsum.photos/seed/${movie.posterParams}/300/450`} 
                className="w-full h-full object-cover"
                alt={movie.title}
                loading="lazy"
              />
              {/* Edit Trigger Overlay */}
              <div 
                className="absolute top-2 right-2 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick(movie);
                }}
                title="Edit Movie"
              >
                 <Edit size={16} className="text-white" />
              </div>
            </div>
            
            <div className="p-3">
               <h3 className="text-sm font-bold text-gray-200 truncate">{movie.title}</h3>
               <div className="flex justify-between items-center mt-1">
                 <span className="text-xs text-green-400">{movie.matchScore}% Match</span>
                 <span className="text-xs text-gray-500">{movie.year}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmsView;
