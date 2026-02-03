
import React, { useState, useEffect } from 'react';
import { MoreVertical, Home, UserPlus } from 'lucide-react';
import HomeView from './components/HomeView';
import AccountSettings from './components/AccountSettings';
import { MadrasaInfo, Student, Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showMenu, setShowMenu] = useState(false);
  
  // Persistent Storage for Madrasa Info
  const [madrasaInfo, setMadrasaInfo] = useState<MadrasaInfo>(() => {
    const saved = localStorage.getItem('madrasaInfo');
    return saved ? JSON.parse(saved) : {
      nameBn: 'টঙ্গী দারুল উলুম মাদ্রাসা',
      nameEn: 'TONDI DARUL ULUM MADRASAH',
      nameAr: 'المدرسة الإسلامية دار العلوم تنگی',
      addressBn: 'সৈলারগাতি, টঙ্গী, গাজীপুর',
      addressEn: 'SOILARGATI, TONGI, GAZIPUR',
      addressAr: 'تنگی، غازیفور، بنغلادیش',
      logo: 'https://picsum.photos/150/150'
    };
  });

  useEffect(() => {
    localStorage.setItem('madrasaInfo', JSON.stringify(madrasaInfo));
  }, [madrasaInfo]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold">প্রবেশপত্র জেনারেটর</h1>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)} 
            className="p-2 hover:bg-indigo-600 rounded-full transition"
          >
            <MoreVertical size={24} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-gray-800">
              <button 
                onClick={() => { setCurrentPage('home'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <Home size={18} /> হোম
              </button>
              <button 
                onClick={() => { setCurrentPage('account'); setShowMenu(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <UserPlus size={18} /> অ্যাকাউন্ট খুলুন
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {currentPage === 'home' ? (
          <HomeView madrasaInfo={madrasaInfo} />
        ) : (
          <AccountSettings 
            madrasaInfo={madrasaInfo} 
            setMadrasaInfo={setMadrasaInfo} 
            onSave={() => setCurrentPage('home')}
          />
        )}
      </main>

      {/* Footer (Optional) */}
      <footer className="p-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} অটোমেটিক প্রবেশপত্র সিস্টেম
      </footer>
    </div>
  );
};

export default App;
