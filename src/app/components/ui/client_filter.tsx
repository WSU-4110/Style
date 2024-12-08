import React from 'react';

interface FilterProps {
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
    sortOption: 'name' | 'date';
    setSortOption: React.Dispatch<React.SetStateAction<'name' | 'date'>>;
    isFilterOpen: boolean;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    resetFilters: () => void; 
}

const Filter: React.FC<FilterProps> = ({
    statusFilter,
    setStatusFilter,
    sortOption,
    setSortOption,
    isFilterOpen,
    setIsFilterOpen,
    resetFilters
}) => {
    return (
        <div className="bg-white p-4 border border-gray-300 rounded-md shadow-sm relative">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-black">Filters</h3>
                <button
                    onClick={() => setIsFilterOpen((prev) => !prev)}
                    className="text-teal-500 text-sm hover:text-teal-700 focus:outline-none"
                >
                    {isFilterOpen ? 'Close' : 'Open'}
                </button>
            </div>

            {isFilterOpen && (
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Status</p>
                        <div className="space-y-2 mt-2">
                            <label className="flex items-center hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="All"
                                    checked={statusFilter === 'All'}
                                    onChange={() => setStatusFilter('All')}
                                    className="mr-2"
                                />
                                <span className="text-xs text-gray-700">All</span>
                            </label>
                            <div className="border-t border-gray-200 my-1"></div>

                            <label className="flex items-center hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Pending"
                                    checked={statusFilter === 'Pending'}
                                    onChange={() => setStatusFilter('Pending')}
                                    className="mr-2"
                                />
                                <span className="text-xs text-gray-700">Pending</span>
                            </label>
                            <div className="border-t border-gray-200 my-1"></div>

                            <label className="flex items-center hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Accepted"
                                    checked={statusFilter === 'Accepted'}
                                    onChange={() => setStatusFilter('Accepted')}
                                    className="mr-2"
                                />
                                <span className="text-xs text-gray-700">Accepted</span>
                            </label>
                            <div className="border-t border-gray-200 my-1"></div>

                            <label className="flex items-center hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Declined"
                                    checked={statusFilter === 'Declined'}
                                    onChange={() => setStatusFilter('Declined')}
                                    className="mr-2"
                                />
                                <span className="text-xs text-gray-700">Declined</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-800">Sort By</p>
                        <div className="space-y-2 mt-2">
                            <label className="flex items-center hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="name"
                                    checked={sortOption === 'name'}
                                    onChange={() => setSortOption('name')}
                                    className="mr-2"
                                />
                                <span className="text-xs text-gray-700">Name</span>
                            </label>
                            <div className="border-t border-gray-200 my-1"></div>

                            <label className="flex items-center hover:bg-gray-100 p-1 rounded-md cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="date"
                                    checked={sortOption === 'date'}
                                    onChange={() => setSortOption('date')}
                                    className="mr-2"
                                />
                                <span className="text-xs text-gray-700">Date</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {isFilterOpen && (
                <div className="absolute bottom-1 right-4">
                    <button
                        onClick={resetFilters}
                        className="px-2 py-1 bg-black text-white text-xs rounded-md hover:bg-gray-800 focus:outline-none"
                    >
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
};

export default Filter;
