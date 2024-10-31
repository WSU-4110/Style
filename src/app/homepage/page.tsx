import { useRouter } from 'next/navigation';
import artistImage from '../../public/artist_barber.jpg';
import customerImage from '../../public/customer.jpg';
import logoImage from '../../public/logo.jpg';
import Navbar from '../components/navigationbar';
import Image from 'next/image';
import React, { useState } from 'react';
import './filter.css';

const Home: React.FC = () => {
    const router = useRouter();

    // Memento class
    class FilterMemento {
        constructor(public state: { selectedFilter: string; searchTerm: string }) {}
    }

    // Caretaker class
    class Caretaker {
        private mementos: FilterMemento[] = [];

        addMemento(memento: FilterMemento) {
            this.mementos.push(memento);
        }

        getLastMemento(): FilterMemento | null {
            return this.mementos.pop() || null;
        }
    }

    const caretaker = new Caretaker();
    const [selectedFilter, setSelectedFilter] = useState<string>('filter1');
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmedSelection, setConfirmedSelection] = useState<boolean>(false);

    const filterNames: Record<string, string> = {
        filter1: 'Barber',
        filter2: 'Tutor',
        filter3: 'Massage',
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFilter(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleConfirmSelection = () => {
        setConfirmedSelection(true);
        const memento = new FilterMemento({ selectedFilter, searchTerm });
        caretaker.addMemento(memento);
        console.log('Confirmed Filter:', filterNames[selectedFilter]);
    };

    const handleUndo = () => {
        const lastMemento = caretaker.getLastMemento();
        if (lastMemento) {
            const { selectedFilter, searchTerm } = lastMemento.state;
            setSelectedFilter(selectedFilter);
            setSearchTerm(searchTerm);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white-100">
            {/* Logo */}
            <div className="absolute top-0 left-0">
                <Image src={logoImage} alt="Logo" width={65} height={65} />
            </div>

            {/* Header */}
            <header className="text-black py-8 text-center">
                <h1 className="text-5xl font-bold tracking-wide">Style</h1>
                <p className="mt-2 text-lg">Where Artists and Customers Connect Effortlessly</p>
            </header>
            
            <Navbar />
            {/* Search Bar */}
            <form onSubmit={(e) => { e.preventDefault(); console.log('Searching for:', searchTerm); }} className="flex justify-center my-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded-l-md"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md">
                    Search
                </button>
            </form>

            {/* Filter Section */}
            <div className="filter">
                <h2 className="text-2xl font-bold">Choose Your Options</h2>
                
                <div className="options-group">
                    <h3 className="text-xl font-bold">Select a Filter:</h3>
                    <label>
                        <input
                            type="radio"
                            value="filter1"
                            checked={selectedFilter === 'filter1'}
                            onChange={handleFilterChange}
                        />
                        Barber
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="filter2"
                            checked={selectedFilter === 'filter2'}
                            onChange={handleFilterChange}
                        />
                        Tutor
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="filter3"
                            checked={selectedFilter === 'filter3'}
                            onChange={handleFilterChange}
                        />
                        Massage
                    </label>
                </div>

                <div>
                    <h4 className="text-lg font-bold">Selected Filter: {filterNames[selectedFilter]}</h4>
                </div>

                <button 
                    onClick={handleConfirmSelection}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                >
                    Confirm Selection
                </button>
                <button 
                    onClick={handleUndo}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                >
                    Undo
                </button>

                {confirmedSelection && (
                    <p className="mt-2 text-green-600">Selection confirmed!</p>
                )}
            </div>

            {/* Redirect Button */}
            <div className="flex justify-center mt-6">
                <button 
                    onClick={() => router.push('schedule')} 
                    className="bg-teal-400 text-white px-4 py-2 rounded-md"
                >
                    Schedule An Appointment
                </button>
            </div>

            <div className="flex justify-center">
                <Image src={artistImage} alt="Artist" width={200} height={200} />
                <Image src={customerImage} alt="Customer" width={200} height={200} />
            </div>
        </div>
    );
};

export default Home;
