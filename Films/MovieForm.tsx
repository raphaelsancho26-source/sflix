import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Movie } from '../types';

interface MovieFormProps {
  initialData?: Movie | null;
  onSave: (movie: Movie) => void;
  onCancel: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Movie>>({
    title: '',
    description: '',
    matchScore: 90,
    year: new Date().getFullYear(),
    ageRating: 'TV-14',
    duration: '2h',
    genre: [],
    backdropParams: 'cinema',
    posterParams: 'cinema',
    isOriginal: false
  });

  const [genreInput, setGenreInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setGenreInput(initialData.genre.join(', '));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process genres
    const genres = genreInput.split(',').map(g => g.trim()).filter(g => g.length > 0);
    
    const newMovie: Movie = {
      id: initialData?.id || Date.now().toString(),
      title: formData.title || 'Untitled',
      description: formData.description || '',
      matchScore: Number(formData.matchScore) || 0,
      year: Number(formData.year) || 2024,
      ageRating: formData.ageRating || 'NR',
      duration: formData.duration || '0m',
      genre: genres,
      backdropParams: formData.backdropParams || 'default',
      posterParams: formData.posterParams || 'default',
      isOriginal: !!formData.isOriginal
    };

    onSave(newMovie);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#181818] w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-gray-800 animate-fade-in">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">{initialData ? 'Edit Movie' : 'Add New Movie'}</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input 
                type="text" 
                required
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#333] text-white p-2 rounded focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Year</label>
              <input 
                type="number" 
                value={formData.year} 
                onChange={e => setFormData({...formData, year: Number(e.target.value)})}
                className="w-full bg-[#333] text-white p-2 rounded focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea 
              rows={3}
              required
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-[#333] text-white p-2 rounded focus:ring-2 focus:ring-red-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Match Score (%)</label>
              <input 
                type="number" 
                max={100}
                min={0}
                value={formData.matchScore} 
                onChange={e => setFormData({...formData, matchScore: Number(e.target.value)})}
                className="w-full bg-[#333] text-white p-2 rounded focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Age Rating</label>
              <input 
                type="text" 
                value={formData.ageRating} 
                onChange={e => setFormData({...formData, ageRating: e.target.value})}
                className="w-full bg-[#333] text-white p-2 rounded focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
             <div>
              <label className="block text-sm text-gray-400 mb-1">Duration</label>
              <input 
                type="text" 
                value={formData.duration} 
                onChange={e => setFormData({...formData, duration: e.target.value})}
                className="w-full bg-[#333] text-white p-2 rounded focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
          </div>

          <div>
             <label className="block text-sm text-gray-400 mb-1">Genres (comma separated)</label>
             <input 
                type="text" 
                value={genreInput} 
                placeholder="Action, Sci-Fi, Drama"
                onChange={e => setGenreInput(e.target.value)}
                className="w-full bg-[#333] text-white p-2 rounded focus:ring-2 focus:ring-red-600 outline-none"
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Image Keyword (Backdrop)</label>
              <input 
                type="text" 
                value={formData.backdropParams} 
                onChange={e => setFormData({...formData, backdropParams: e.target.value})}
                className="w-full bg-[#333] text-white p-2 rounded focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
             <div>
              <label className="block text-sm text-gray-400 mb-1">Image Keyword (Poster)</label>
              <input 
                type="text" 
                value={formData.posterParams} 
                onChange={e => setFormData({...formData, posterParams: e.target.value})}
                className="w-full bg-[#333] text-white p-2 rounded focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
             <input 
                type="checkbox" 
                id="isOriginal"
                checked={formData.isOriginal}
                onChange={e => setFormData({...formData, isOriginal: e.target.checked})}
                className="w-5 h-5 rounded text-red-600 focus:ring-red-600 bg-[#333]"
             />
             <label htmlFor="isOriginal" className="text-white select-none">SFLIX Original</label>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-800 mt-4">
             <button type="submit" className="flex-1 bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition">
                {initialData ? 'Update Movie' : 'Add Movie'}
             </button>
             <button type="button" onClick={onCancel} className="flex-1 bg-gray-600 text-white font-bold py-3 rounded hover:bg-gray-700 transition">
                Cancel
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
