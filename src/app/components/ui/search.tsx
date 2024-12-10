import React from 'react';

interface SearchBarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
    return (
        <div className="max-w-xs mx-auto mt-6">
            <input
                type="text"
                placeholder="Search..."
                className="w-full p-3 rounded-md border border-gray-600 shadow-sm text-black" 
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
            />
        </div>
    );
};

export default SearchBar;
