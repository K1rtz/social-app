import React, { useEffect, useRef, useState } from 'react'
import { useProfilePopup } from '../../../context/PopupProfileContext';

const SearchBar = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]); // Zameni sa pravim tipom za korisnike
    const [loading, setLoading] = useState(false);

    const [showResults, setShowResults] = useState(false); // 👈 novo stanje
    const wrapperRef = useRef<HTMLDivElement>(null); // 👈 referenca na celu komponentu

    const { openProfile, username} = useProfilePopup();


    useEffect(() => {
        if (query.length === 0) {
            setResults([]);
            return;
        }
        
        const debounceTimeout = setTimeout(() => {
            fetchSearchResults(query);
        }, 300); // Delay od 300ms

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



        {query && results.length > 0 && showResults  &&(
                        <div className="absolute  bg-[#261b2c] shadow-md p-2 rounded-md mt-11 max-h-60 w-96 overflow-y-auto">
                            {loading ? (
                                <div className="text-center p-4">Loading...</div>
                            ) : (
                                results.map((result, index) => (
                                    <div key={index} className="cursor-pointer p-2 hover:bg-gray-200"
                                    onClick={()=>openProfile(result.username)}>
                                        <div className="flex items-center">
                                            <img src={result.profilePic} alt="avatar" className="h-8 w-8 rounded-full" />
                                            <div className="ml-3">
                                                <h1 className="text-sm font-semibold"
                                                >{result.fullName}</h1>
                                                <h2 className="text-xs text-gray-500">@{result.username}</h2>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
            </div>

}

export default SearchBar