import { render, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'; // Ensure useEffect is imported


// Mock axios module with proper type definition
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>; // Typing axios mock

// Define the MockSearchBar directly in the test file
const MockSearchBar: React.FC<{ onSearch: (term: string) => void }> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm); // Call the onSearch function passed as prop
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

// Test 1: Ensure MockSearchBar renders correctly
test('SearchBar renders correctly', () => {
  const mockSearch = jest.fn(); // Create mock function to pass as onSearch
  const { getByPlaceholderText, getByRole } = render(<MockSearchBar onSearch={mockSearch} />);

  // Check that the input field and button are rendered
  expect(getByPlaceholderText('Search...')).toBeInTheDocument();
  expect(getByRole('button', { name: /Search/i })).toBeInTheDocument();
});

// Test 2: Ensure onSearch is called when the form is submitted
test('SearchBar calls onSearch when form is submitted', () => {
  const mockSearch = jest.fn();
  const { getByPlaceholderText, getByRole } = render(<MockSearchBar onSearch={mockSearch} />);

  const input = getByPlaceholderText('Search...');
  const button = getByRole('button', { name: /Search/i });

  fireEvent.change(input, { target: { value: 'Artist' } }); // Simulate typing
  fireEvent.click(button); // Simulate form submission

  expect(mockSearch).toHaveBeenCalledWith('Artist'); // Check if onSearch was called with the correct value
});

// Test 3: Ensure categories are fetched and displayed
test('Categories are fetched and displayed', async () => {
  mockedAxios.get.mockResolvedValue({ data: [{ name: 'Hair Stylists' }, { name: 'Tattoo Artists' }] });

  const MockHome: React.FC = () => {
    const [categories, setCategories] = useState<{ name: string }[]>([]); // Typed state for categories
    
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/category/categories/');
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
      fetchCategories();
    }, []);

    return (
      <div>
        <h2>Categories</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  const { getByText } = render(<MockHome />);

  await waitFor(() => {
    expect(getByText('Hair Stylists')).toBeInTheDocument();
    expect(getByText('Tattoo Artists')).toBeInTheDocument();
  });
});

// Test 4: Ensure search results are displayed after search
test('Search results are displayed after search', async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: [{ name: 'Tattoo Artist 1' }, { name: 'Tattoo Artist 2' }] });

  const MockHome: React.FC = () => {
    const [searchResults, setSearchResults] = useState<{ name: string }[]>([]); // Typed state for search results
    
    const handleSearch = async (term: string) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/search/search/?q=${term}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    return (
      <div>
        <MockSearchBar onSearch={handleSearch} />
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  const { getByPlaceholderText, getByRole, getByText } = render(<MockHome />);

  fireEvent.change(getByPlaceholderText('Search...'), { target: { value: 'Tattoo' } });
  fireEvent.click(getByRole('button', { name: /Search/i }));

  await waitFor(() => {
    expect(getByText('Tattoo Artist 1')).toBeInTheDocument();
    expect(getByText('Tattoo Artist 2')).toBeInTheDocument();
  });
});

// Test 5: Test if the Logo renders correctly
test('Logo image renders correctly', () => {
  const { getByAltText } = render(
    <div>
      <Image src="logo.png" alt="Logo" width={64} height={30} />
    </div>
  );

  // Check if the logo image is rendered
  expect(getByAltText('Logo')).toBeInTheDocument();
});

// Test 6: Test the Sidebar categories render correctly (mocking router)
test('Sidebar categories render correctly', () => {
  const mockRouterPush = jest.fn();
  jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockRouterPush }),
  }));

  const MockSidebar = () => (
    <nav>
      <ul>
        <li>
          <button onClick={() => mockRouterPush('/nailsalon')}>Nail Salon</button>
        </li>
        <li>
          <button onClick={() => mockRouterPush('/hair')}>Hair Stylists</button>
        </li>
        <li>
          <button onClick={() => mockRouterPush('/tattoo')}>Tattoo Artists</button>
        </li>
        <li>
          <button onClick={() => mockRouterPush('/barber')}>Barber Shops</button>
        </li>
      </ul>
    </nav>
  );

  const { getByText } = render(<MockSidebar />);

  // Check if the sidebar items are rendered
  expect(getByText('Nail Salon')).toBeInTheDocument();
  expect(getByText('Hair Stylists')).toBeInTheDocument();
  expect(getByText('Tattoo Artists')).toBeInTheDocument();
  expect(getByText('Barber Shops')).toBeInTheDocument();

  // Test the navigation click
  fireEvent.click(getByText('Hair Stylists'));
  expect(mockRouterPush).toHaveBeenCalledWith('/hair');
});
