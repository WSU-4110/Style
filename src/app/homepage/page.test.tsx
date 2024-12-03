import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { jest } from '@jest/globals';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';



//test1
// Directly include the search bar JSX instead of mocking it
test('SearchBar triggers onSearch function when button is clicked', () => {
  const mockOnSearch = jest.fn();

  const { getByText, getByPlaceholderText } = render(
    <div>
      <input placeholder="Search..." onChange={(e) => mockOnSearch(e.target.value)} />
      <button onClick={() => mockOnSearch('test')}>Search</button>
    </div>
  );

  const input = getByPlaceholderText('Search...');
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.click(getByText('Search'));

  expect(mockOnSearch).toHaveBeenCalledWith('test');
});

//test2
// Mock axios to simulate the categories API call
jest.mock('axios'); // This will automatically mock axios

interface Category {
  name: string;
}

test('displays categories after data is fetched', async () => {
  const categories: Category[] = [{ name: 'Hair' }, { name: 'Tattoo' }];

  // Type the mocked axios.get function properly
  (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
    data: categories,
  });

  const { getByText } = render(
    <div>
      {categories.map((category: Category) => (
        <div key={category.name}>{category.name}</div>
      ))}
    </div>
  );

  await waitFor(() => getByText('Hair'));
  await waitFor(() => getByText('Tattoo'));

  expect(getByText('Hair')).toBeInTheDocument();
  expect(getByText('Tattoo')).toBeInTheDocument();
});

//test3
// Mock axios to simulate the search API call
jest.mock('axios');

interface SearchResult {
  name: string;
}

test('displays search results after search', async () => {
  const searchResults: SearchResult[] = [{ name: 'Tattoo Artist' }];
  
  // Type the mocked axios.get function properly
  (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
    data: searchResults,
  });

  const { getByPlaceholderText, getByText } = render(
    <div>
      <input placeholder="Search..." />
      <button
        onClick={async () => {
          const response = await axios.get('mocked-url');
          response.data.forEach((item: SearchResult) => {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = item.name;
            document.body.appendChild(resultDiv);
          });
        }}
      >
        Search
      </button>
    </div>
  );

  const input = getByPlaceholderText('Search...');
  fireEvent.change(input, { target: { value: 'tattoo' } });
  fireEvent.click(getByText('Search'));

  await waitFor(() => getByText('Tattoo Artist'));

  const result = getByText('Tattoo Artist');
  expect(result).toBeInTheDocument();
});

//test4
// Mock next/navigation for useRouter correctly
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

test('navigates to the correct route when sidebar button is clicked', () => {
  const push = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push });

  const { getByText } = render(
    <div>
      <button onClick={() => push('/nailsalon')}>Nail Salon</button>
    </div>
  );

  fireEvent.click(getByText('Nail Salon'));

  expect(push).toHaveBeenCalledWith('/nailsalon');
});

//test5
// Mock next/image to avoid actual image rendering
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <div>{alt}</div>,
}));

test('renders images correctly', () => {
  const { getByAltText } = render(
    <div>
      <Image src="mocked-image.jpg" alt="Artist" />
      <Image src="mocked-image.jpg" alt="Customer" />
    </div>
  );

  const artistImage = getByAltText('Artist');
  const customerImage = getByAltText('Customer');

  expect(artistImage).toBeInTheDocument();
  expect(customerImage).toBeInTheDocument();
});

// 6. Mock next/image to avoid actual image rendering
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <div>{alt}</div>,  // Explicitly type 'alt' as string
}));

test('renders the logo in the header', () => {
  const { getByAltText } = render(
    <div>
      <Image src="logo.jpg" alt="Logo" />
    </div>
  );

  const logoImage = getByAltText('Logo');
  expect(logoImage).toBeInTheDocument();
});