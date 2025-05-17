import React, { useEffect, useRef, useState } from 'react'
import { useProfilePopup } from '../../../context/PopupProfileContext';

const SearchBar = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [showResults, setShowResults] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { openProfile, username} = useProfilePopup();


    useEffect(() => {
        if (query.length === 0) {
            setResults([]);
            return;
        }
        
        const debounceTimeout = setTimeout(() => {
            fetchSearchResults(query);
        }, 300); 

        return () => clearTimeout(debounceTimeout); // Očisti timeout kada se menja query
    }, [query]);

    const fetchSearchResults = async (searchQuery: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/search/searchUsers?q=${searchQuery}`);
            const data = await res.json();
            console.log(data.users);
            setResults(data.users)
            setShowResults(true) 
        } catch (error) {   
            console.error("Error fetching search results", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setShowResults(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);


   return  <div ref={wrapperRef} className="relative flex justify-center flex-1">
        <input 
            type="text" 
            placeholder="Search..." 
            value={query}
            onChange={handleChange}
            onFocus={() => {
                if (results.length > 0) setShowResults(true);
              }}
            className="bg-purple-300/20 input w-96 h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

            {query && results.length >= 0 && showResults && (
            <div className="absolute z-50 bg-[#1d0c2c] shadow-lg rounded-lg mt-11 max-h-60 w-96 overflow-y-auto border border-[#3c2a4d]">
                {loading ? (
                <div className="text-center p-4 text-gray-400 animate-pulse">Searching...</div>
                ) : results.length === 0 ? (
                <div className="text-center p-4 text-gray-500">No results found.</div>
                ) : (
                results.map((result, index) => (
                    <div
                    key={index}
                    onClick={() => openProfile(result.username)}
                    className="flex items-center gap-3 p-3 cursor-pointer transition-colors duration-150 hover:bg-[#27243f] rounded-md"
                    >
                    <img
                        src={result.profilePic}
                        alt="avatar"
                        className="h-9 w-9 rounded-full object-cover border border-[#2d1a4e]"
                    />
                    <div>
                        <h1 className="text-sm font-medium text-white">{result.fullName}</h1>
                        <h2 className="text-xs text-gray-400">@{result.username}</h2>
                    </div>
                    </div>
                ))
                )}
            </div>
            )}

            </div>

}

export default SearchBar