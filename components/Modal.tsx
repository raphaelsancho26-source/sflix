import React from 'react';
import { X, Play, Plus, Check, ThumbsUp } from 'lucide-react';
import { Movie } from '../types';

interface ModalProps {
  movie: Movie | null;
  onClose: () => void;
  onPlay: () => void;
  isInMyList: boolean;
  onToggleMyList: (movie: Movie) => void;
}

const Modal: React.FC<ModalProps> = ({ movie, onClose, onPlay, isInMyList, onToggleMyList }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative bg-[#181818] w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden animate-fade-in-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-[#181818] rounded-full p-1 hover:bg-gray-700 transition"
        >
          <X className="text-white" size={24} />
        </button>

        {/* Hero Image in Modal */}
        <div className="relative h-[300px] md:h-[450px]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent z-10"></div>
          <img 
            src={`https://picsum.photos/seed/${movie.backdropParams}/1200/800`} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-8 left-8 z-20 w-full max-w-lg">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{movie.title}</h2>
             <div className="flex items-center gap-4">
               <button onClick={onPlay} className="bg-white text-black px-6 md:px-8 py-2 rounded flex items-center gap-2 font-bold hover:bg-gray-200 transition">
                 <Play size={20} fill="black" /> Play
               </button>
               <button 
                 onClick={() => onToggleMyList(movie)}
                 className="border border-gray-400 text-white p-2 rounded-full hover:border-white transition bg-black/40 hover:bg-black/60"
                 title={isInMyList ? "Remove from My List" : "Add to My List"}
               >
                 {isInMyList ? <Check size={20} /> : <Plus size={20} />}
               </button>
               <button className="border border-gray-400 text-white p-2 rounded-full hover:border-white transition bg-black/40 hover:bg-black/60">
                 <ThumbsUp size={20} />
               </button>
             </div>
          </div>
        </div>

        {/* Info Content */}
        <div className="p-8 grid md:grid-cols-[2fr_1fr] gap-8">
          <div className="text-white">
            <div className="flex items-center gap-4 mb-4 text-sm font-medium">
              <span className="text-green-400 font-bold">{movie.matchScore}% Match</span>
              <span className="text-gray-300">{movie.year}</span>
              <span className="border border-gray-500 px-1 text-xs rounded">{movie.ageRating}</span>
              <span className="text-gray-300">{movie.duration}</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {movie.description}
            </p>
          </div>

          <div className="text-sm text-gray-400 flex flex-col gap-4">
             <div>
                <span className="text-gray-500 block mb-1">Genres:</span>
                <span className="text-white">{movie.genre.join(', ')}</span>
             </div>
             <div>
                <span className="text-gray-500 block mb-1">Original Language:</span>
                <span className="text-white">English</span>
             </div>
             {movie.isOriginal && (
               <div className="mt-4">
                  <span className="text-red-600 uppercase tracking-widest text-xs font-bold border border-red-600 px-2 py-1 rounded">SFLIX Original</span>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;