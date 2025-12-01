import React, { useState } from 'react';
import { PlusCircle, Edit2 } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileSelectionProps {
  profiles: UserProfile[];
  onSelectProfile: (profile: UserProfile) => void;
  onAddProfile: () => void;
}

const ProfileSelection: React.FC<ProfileSelectionProps> = ({ profiles, onSelectProfile, onAddProfile }) => {
  const [isManaging, setIsManaging] = useState(false);

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center animate-fade-in">
      <h1 className="text-3xl md:text-5xl font-medium text-white mb-8 md:mb-12 tracking-wide">Who's watching?</h1>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
        {profiles.map((profile) => (
          <div 
            key={profile.id} 
            className="group flex flex-col items-center gap-3 cursor-pointer w-24 md:w-32"
            onClick={() => !isManaging && onSelectProfile(profile)}
          >
            <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden transition-all duration-300 border-2 border-transparent ${!isManaging && 'group-hover:border-white'}`}>
               <div className={`w-full h-full ${profile.avatarColor} flex items-center justify-center`}>
                  {/* Avatar "Smile" */}
                  <div className="text-white text-4xl md:text-6xl font-bold opacity-80 select-none">
                    {profile.name[0]}
                  </div>
               </div>
               {isManaging && (
                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Edit2 className="text-white" size={32} />
                 </div>
               )}
            </div>
            <span className="text-gray-400 text-lg md:text-xl group-hover:text-white transition-colors duration-300">
              {profile.name}
            </span>
          </div>
        ))}

        {/* Add Profile Button */}
        <div 
            className="group flex flex-col items-center gap-3 cursor-pointer w-24 md:w-32"
            onClick={onAddProfile}
        >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-md bg-transparent border-2 border-gray-600 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                <PlusCircle className="text-gray-600 w-12 h-12 md:w-16 md:h-16 group-hover:text-black transition-colors" />
            </div>
            <span className="text-gray-400 text-lg md:text-xl group-hover:text-white transition-colors duration-300">
              Add Profile
            </span>
        </div>
      </div>

      <button 
        onClick={() => setIsManaging(!isManaging)}
        className={`px-8 py-2 border border-gray-500 text-gray-500 text-lg font-medium tracking-widest hover:text-white hover:border-white transition-all uppercase ${isManaging ? 'bg-white text-black border-white hover:text-black hover:bg-gray-200' : ''}`}
      >
        {isManaging ? 'Done' : 'Manage Profiles'}
      </button>
    </div>
  );
};

export default ProfileSelection;