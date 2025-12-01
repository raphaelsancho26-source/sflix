import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, ChevronDown } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  onSearchClick: () => void;
  onHomeClick: () => void;
  onMyListClick: () => void;
  onFilmsClick: () => void;
  activeProfile: UserProfile;
  onSwitchProfile: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchClick, onHomeClick, onMyListClick, onFilmsClick, activeProfile, onSwitchProfile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={onHomeClick} className="text-red-600 text-3xl font-bold tracking-tighter cursor-pointer hover:scale-105 transition-transform">
            SFLIX
          </button>
          
          <div className="hidden md:flex gap-6 text-sm text-gray-300">
            <button onClick={onHomeClick} className="hover:text-white font-medium transition">Home</button>
            <button className="hover:text-white transition">Series</button>
            <button onClick={onFilmsClick} className="hover:text-white transition">Films</button>
            <button className="hover:text-white transition">New & Popular</button>
            <button onClick={onMyListClick} className="hover:text-white transition">My List</button>
          </div>
        </div>

        <div className="flex items-center gap-6 text-white">
          <button 
            onClick={onSearchClick}
            className="hover:text-gray-300 transition"
            aria-label="Search"
          >
            <Search size={22} />
          </button>
          <button className="hidden sm:block hover:text-gray-300 transition">
            <Bell size={22} />
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative group">
             <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                onMouseEnter={() => setIsProfileMenuOpen(true)}
             >
                <div className={`w-8 h-8 rounded ${activeProfile.avatarColor} flex items-center justify-center overflow-hidden border border-transparent group-hover:border-white transition-all`}>
                    <span className="font-bold text-sm">{activeProfile.name[0]}</span>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
             </div>

             {/* Dropdown Menu */}
             {isProfileMenuOpen && (
               <div 
                 className="absolute right-0 top-full mt-2 w-48 bg-black/95 border border-gray-800 rounded shadow-xl py-2 flex flex-col"
                 onMouseLeave={() => setIsProfileMenuOpen(false)}
               >
                 <div className="px-4 py-2 text-xs text-gray-400 cursor-default">
                    Current: <span className="text-white font-bold">{activeProfile.name}</span>
                 </div>
                 <hr className="border-gray-700 my-1" />
                 <button className="text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition">Account</button>
                 <button className="text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition">Help Center</button>
                 <hr className="border-gray-700 my-1" />
                 <button 
                    onClick={onSwitchProfile}
                    className="text-left px-4 py-2 text-sm text-white hover:underline"
                 >
                    Switch Profile
                 </button>
               </div>
             )}
          </div>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#141414] border-t border-gray-800 p-4 absolute w-full flex flex-col gap-4 text-gray-300 text-sm">
            <button onClick={() => { onHomeClick(); setIsMobileMenuOpen(false); }} className="text-left hover:text-white">Home</button>
            <button className="text-left hover:text-white">Series</button>
            <button onClick={() => { onFilmsClick(); setIsMobileMenuOpen(false); }} className="text-left hover:text-white">Films</button>
            <button className="text-left hover:text-white">New & Popular</button>
            <button onClick={() => { onMyListClick(); setIsMobileMenuOpen(false); }} className="text-left hover:text-white">My List</button>
            <button onClick={onSwitchProfile} className="text-left hover:text-white border-t border-gray-700 pt-4">Switch Profile</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
