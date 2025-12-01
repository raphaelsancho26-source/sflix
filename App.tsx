import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Row from './components/Row';
import Modal from './components/Modal';
import ProfileSelection from './components/ProfileSelection';
import FilmsView from './Films/FilmsView';
import MovieForm from './Films/MovieForm';
import { Movie, CategoryRow, AppView, UserProfile } from './types';
import { MOCK_HERO_MOVIE } from './constants';
import { INITIAL_MOVIES } from './Films/initialMovies';
import { fetchCategoryMovies, fetchRecommendedMovies } from './services/geminiService';
import { Search, Loader, PlayCircle, ArrowLeft, Plus } from 'lucide-react';

const INITIAL_PROFILES: UserProfile[] = [
  { id: '1', name: 'Lucas', avatarColor: 'bg-blue-600', isKid: false, myList: [] },
  { id: '2', name: 'Julia', avatarColor: 'bg-red-600', isKid: false, myList: [] },
  { id: '3', name: 'Grandma', avatarColor: 'bg-green-600', isKid: false, myList: [] },
  { id: '4', name: 'Kids', avatarColor: 'bg-yellow-500', isKid: true, myList: [] },
];

function App() {
  // Profile State
  const [profiles, setProfiles] = useState<UserProfile[]>(INITIAL_PROFILES);
  const [activeProfile, setActiveProfile] = useState<UserProfile | null>(null);

  // App View State
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // Data State
  const [allMovies, setAllMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loadingRows, setLoadingRows] = useState<boolean>(false);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize Rows from All Movies
  useEffect(() => {
    // Categorize initial movies for Home Page
    const trending = allMovies.slice(0, 4);
    const originals = allMovies.filter(m => m.isOriginal);
    
    setRows([
        { title: "Trending Now", movies: trending },
        { title: "SFLIX Originals", movies: originals }
    ]);
  }, [allMovies]);

  // Load dynamic content on mount
  useEffect(() => {
    const loadDynamicContent = async () => {
      if (!process.env.API_KEY) return;
      
      setLoadingRows(true);
      try {
        const [comedy, action] = await Promise.all([
          fetchCategoryMovies('Dark Comedy'),
          fetchCategoryMovies('Cyberpunk Action')
        ]);

        if (comedy.length > 0) {
          setRows(prev => [...prev, { title: "Critically Acclaimed Dark Comedies", movies: comedy }]);
        }
        if (action.length > 0) {
           setRows(prev => [...prev, { title: "High-Octane Future Action", movies: action }]);
        }
      } catch (err) {
        console.error("Failed to load AI content", err);
      } finally {
        setLoadingRows(false);
      }
    };

    loadDynamicContent();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResults([]); // Clear previous
    
    const results = await fetchRecommendedMovies(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleAddProfile = () => {
     const newId = (profiles.length + 1).toString();
     const colors = ['bg-purple-600', 'bg-pink-600', 'bg-indigo-600', 'bg-orange-600'];
     const randomColor = colors[Math.floor(Math.random() * colors.length)];
     
     const newProfile: UserProfile = {
         id: newId,
         name: `User ${newId}`,
         avatarColor: randomColor,
         isKid: false,
         myList: []
     };
     setProfiles([...profiles, newProfile]);
  };

  const handleToggleMyList = (movie: Movie) => {
    if (!activeProfile) return;

    const isInList = activeProfile.myList.some(m => m.id === movie.id);
    let updatedList;
    
    if (isInList) {
        updatedList = activeProfile.myList.filter(m => m.id !== movie.id);
    } else {
        updatedList = [...activeProfile.myList, movie];
    }

    const updatedProfile = { ...activeProfile, myList: updatedList };
    setActiveProfile(updatedProfile);
    setProfiles(prevProfiles => 
        prevProfiles.map(p => p.id === activeProfile.id ? updatedProfile : p)
    );
  };

  // Movie CRUD Handlers
  const handleSaveMovie = (movie: Movie) => {
      if (movieToEdit) {
          // Update existing
          setAllMovies(prev => prev.map(m => m.id === movie.id ? movie : m));
      } else {
          // Create new
          setAllMovies(prev => [movie, ...prev]);
      }
      setIsEditing(false);
      setMovieToEdit(null);
  };

  const handleDeleteMovie = (id: string) => {
      setAllMovies(prev => prev.filter(m => m.id !== id));
      // Also close modal if open
      if (selectedMovie?.id === id) setSelectedMovie(null);
  };

  // If no profile is selected, show the Profile Selection screen
  if (!activeProfile) {
    return (
        <ProfileSelection 
            profiles={profiles} 
            onSelectProfile={setActiveProfile} 
            onAddProfile={handleAddProfile}
        />
    );
  }

  const renderContent = () => {
    if (currentView === AppView.PLAYER) {
        return (
            <div className="fixed inset-0 bg-black flex items-center justify-center z-[100]">
                 <button 
                    onClick={() => setCurrentView(AppView.HOME)}
                    className="absolute top-8 left-8 text-white flex items-center gap-2 hover:text-gray-300 transition"
                 >
                    <ArrowLeft size={32} /> Back
                 </button>
                 <div className="text-center">
                    <div className="animate-spin text-red-600 mb-6">
                        <Loader size={64} />
                    </div>
                    <h2 className="text-white text-2xl font-bold mb-2">Streaming...</h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                        This is a demo. In a real app, the video player would play: <br/>
                        <span className="text-red-500 font-bold">{selectedMovie?.title || 'Video'}</span>
                    </p>
                 </div>
            </div>
        )
    }

    if (currentView === AppView.SEARCH) {
      return (
        <div className="min-h-screen pt-24 px-4 md:px-12 bg-[#141414]">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12 relative">
             <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask AI: 'I want a scary movie from the 80s' or 'Funny movies about space'..."
                className="w-full bg-[#2b2b2b] text-white px-6 py-4 rounded pl-14 focus:outline-none focus:ring-2 focus:ring-red-600 text-lg transition-all"
                autoFocus
             />
             <Search className="absolute left-4 top-4 text-gray-400" size={24} />
             {isSearching && (
                 <div className="absolute right-4 top-4 animate-spin text-red-600">
                     <Loader size={24} />
                 </div>
             )}
          </form>

          {isSearching ? (
             <div className="text-center text-gray-400 mt-20">
                <p>Asking Gemini AI for recommendations...</p>
             </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.map(movie => (
                <div 
                   key={movie.id} 
                   onClick={() => setSelectedMovie(movie)}
                   className="relative group cursor-pointer"
                >
                   <img 
                     src={`https://picsum.photos/seed/${movie.posterParams}/300/450`} 
                     className="rounded-md w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                     alt={movie.title}
                   />
                   <div className="mt-2">
                      <p className="text-sm font-bold text-gray-200 truncate">{movie.title}</p>
                      <p className="text-xs text-green-400">{movie.matchScore}% Match</p>
                   </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center text-gray-500 mt-20">
                <PlayCircle size={64} className="mx-auto mb-4 opacity-50" />
                <p>Search for titles, genres, or describe your mood to the AI.</p>
             </div>
          )}
        </div>
      );
    }

    if (currentView === AppView.MY_LIST) {
        return (
            <div className="min-h-screen pt-24 px-4 md:px-12 bg-[#141414]">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">My List</h1>
                {activeProfile.myList.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {activeProfile.myList.map(movie => (
                        <div 
                        key={movie.id} 
                        onClick={() => setSelectedMovie(movie)}
                        className="relative group cursor-pointer"
                        >
                        <img 
                            src={`https://picsum.photos/seed/${movie.posterParams}/300/450`} 
                            className="rounded-md w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                            alt={movie.title}
                        />
                        <div className="mt-2">
                            <p className="text-sm font-bold text-gray-200 truncate">{movie.title}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-green-400">{movie.matchScore}% Match</p>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500 mt-20 gap-4">
                        <Plus size={48} className="opacity-50" />
                        <p>You haven't added any titles to your list yet.</p>
                    </div>
                )}
            </div>
        );
    }

    if (currentView === AppView.FILMS) {
        return (
            <FilmsView 
                movies={allMovies}
                onMovieClick={(m) => setSelectedMovie(m)}
                onAddClick={() => {
                    setMovieToEdit(null);
                    setIsEditing(true);
                }}
                onEditClick={(m) => {
                    setMovieToEdit(m);
                    setIsEditing(true);
                }}
            />
        );
    }

    // HOME VIEW
    return (
      <div className="pb-20">
        <Hero 
            movie={allMovies[0] || MOCK_HERO_MOVIE} 
            onPlay={() => { setSelectedMovie(allMovies[0] || MOCK_HERO_MOVIE); setCurrentView(AppView.PLAYER); }}
            onMoreInfo={(m) => setSelectedMovie(m)}
        />
        
        <div className="-mt-16 md:-mt-32 relative z-10 pl-4 md:pl-12 space-y-2 md:space-y-8">
            {rows.map((row) => (
                <Row 
                    key={row.title} 
                    title={row.title} 
                    movies={row.movies} 
                    onMovieClick={(m) => setSelectedMovie(m)}
                    isLarge={row.title === 'SFLIX Originals'}
                />
            ))}
            
            {loadingRows && (
                <div className="h-40 flex items-center justify-center text-gray-500">
                    <Loader className="animate-spin mr-2" /> Loading personalized categories...
                </div>
            )}
        </div>

        <div className="mt-12 px-12 pb-12 text-center text-gray-500 text-sm">
            <p>SFLIX Uses Google Gemini AI to generate mock content.</p>
            <p>© 2024 SFLIX Inc.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#141414] min-h-screen text-white font-sans selection:bg-red-600 selection:text-white">
      <Navbar 
        activeProfile={activeProfile}
        onSearchClick={() => setCurrentView(AppView.SEARCH)}
        onHomeClick={() => { setCurrentView(AppView.HOME); setSearchResults([]); setSearchQuery(''); }}
        onMyListClick={() => setCurrentView(AppView.MY_LIST)}
        onFilmsClick={() => setCurrentView(AppView.FILMS)}
        onSwitchProfile={() => setActiveProfile(null)}
      />
      
      {renderContent()}

      <Modal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)}
        onPlay={() => { setCurrentView(AppView.PLAYER); setSelectedMovie(null); }}
        isInMyList={activeProfile ? activeProfile.myList.some(m => m.id === selectedMovie?.id) : false}
        onToggleMyList={handleToggleMyList}
      />

      {isEditing && (
          <MovieForm 
             initialData={movieToEdit}
             onSave={handleSaveMovie}
             onCancel={() => { setIsEditing(false); setMovieToEdit(null); }}
          />
      )}
    </div>
  );
}

export default App;
