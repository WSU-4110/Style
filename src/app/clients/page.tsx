'use client';
import React, { useState } from 'react';
import ClientCard from '../components/ui/client_card';
import Filter from '../components/ui/client_filter';
import SearchBar from '../components/ui/search';

const Clients: React.FC = () => {
    const [bookings, setBookings] = useState([
        { id: 1, clientName: 'Terry Springer', service: 'Haircut', date: '2024-10-27', amountDue: '$45', status: 'Pending', actionDate: null as string | null },
        { id: 2, clientName: 'John Berry', service: 'Hair Coloring', date: '2024-11-03', amountDue: '$90', status: 'Pending', actionDate: null as string | null },
        { id: 3, clientName: 'Louis Blake', service: 'Haircut', date: '2024-11-13', amountDue: '$45', status: 'Pending', actionDate: null as string | null },
        { id: 4, clientName: 'Rob Zullo', service: 'Trim', date: '2024-11-17', amountDue: '$25', status: 'Pending', actionDate: null as string | null },
    ]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortOption, setSortOption] = useState<'name' | 'date'>('name');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const resetFilters = () => {
        setStatusFilter('All');
        setSortOption('name');
    };
    
    const handleAction = (id: number, action: 'Accepted' | 'Declined') => {
        const actionDate = new Date().toLocaleDateString();
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id
              ? { ...booking, status: action, actionDate }
              : booking
          )
        );
    };

    const filteredBookings = bookings
        .filter(booking =>
            booking.clientName.toLowerCase().includes(search.toLowerCase())
        )
        .filter(booking =>
            statusFilter === 'All' || booking.status === statusFilter
        );

    const sortedBookings = filteredBookings.sort((a, b) => {
        if (sortOption === 'name') {
            return a.clientName.localeCompare(b.clientName);
        } else {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
    });

    return (
        <div className="min-h-screen bg-gray text-gray-800">
            <header className="bg-black text-white py-7 text-center">
                <h1 className="text-3xl font-bold tracking-wide">Dave's Barbershop</h1>
                <h2 className="text-xl mt-2">Manage Your Client Bookings</h2>
            </header>
            <main className="px-6 flex gap-8">
                <div className="w-1/4 space-y-4">
                    <SearchBar search={search} setSearch={setSearch} />
                    <Filter
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                        isFilterOpen={isFilterOpen}
                        setIsFilterOpen={setIsFilterOpen}
                        resetFilters={resetFilters}
                    />
                </div>

                <div className="flex-1">
                    <div className="space-y-4 mb-4">
                        {sortedBookings.map(booking => (
                            <ClientCard
                                key={booking.id}
                                {...booking}
                                onAction={handleAction}
                            />
                        ))}
                    </div>

                    {sortedBookings.length === 0 && (
                        <p className="text-center text-gray-500 mt-6">No bookings found.</p>
                    )}
                </div>

                <div className="w-1/4 bg-white p-6 border border-gray-600 rounded-md shadow-sm mb-4">
                    <h3 className="text-2xl font-bold mb-4 text-black">Client Activity</h3>
                    <div className="text-gray-600 text-sm">
                        <p>Total Bookings: <span className="font-bold">{bookings.length}</span></p>
                        <p>Pending: <span className="font-bold">{bookings.filter(b => b.status === 'Pending').length}</span></p>
                        <p>Accepted: <span className="font-bold">{bookings.filter(b => b.status === 'Accepted').length}</span></p>
                        <p>Declined: <span className="font-bold">{bookings.filter(b => b.status === 'Declined').length}</span></p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Clients;
