import { render, screen, fireEvent } from '@testing-library/react';
import NailSalonPage from './page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('NailSalonPage', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders the title correctly', () => {
    render(<NailSalonPage />);
    expect(screen.getByText('Nail Salons')).toBeInTheDocument();
  });

  it('displays a business card with the correct details', () => {
    render(<NailSalonPage />);
    expect(screen.getByText('Nail Palace')).toBeInTheDocument();
    expect(screen.getByText('829 Maple St, Kansas City, KS')).toBeInTheDocument();
    expect(screen.getByAltText('Nail Palace image')).toBeInTheDocument();
    expect(screen.getByText('A relaxing nail salon offering the best manicures and pedicures.')).toBeInTheDocument();
    expect(screen.getByText('Manicure')).toBeInTheDocument();
    expect(screen.getByText('Pedicure')).toBeInTheDocument();
    expect(screen.getByText('Nail Art')).toBeInTheDocument();
    expect(screen.getByText('https://instagram.com/nailpalace')).toHaveAttribute('href', 'https://instagram.com/nailpalace');
  });
  

  it('renders a fallback message if no businesses are available', () => {
    render(<NailSalonPage businesses={[]} />); 
    expect(screen.getByText('No businesses available. Please check back later!')).toBeInTheDocument();
  });
  
  
  it('calls router.push when "Book" is clicked', () => {
    render(<NailSalonPage />);
    const bookButton = screen.getByText('Book');
    fireEvent.click(bookButton);
    expect(mockPush).toHaveBeenCalledWith('schedule');
  });
  

  it('displays the correct number of businesses', () => {
    render(<NailSalonPage />);
    const businessCards = screen.getAllByText('Nail Palace');
    expect(businessCards).toHaveLength(1);
  });


  it('displays the social link correctly', () => {
    render(<NailSalonPage />);
    const socialLink = screen.getByText('https://instagram.com/nailpalace');
    expect(socialLink).toBeInTheDocument();
    expect(socialLink).toHaveAttribute('href', 'https://instagram.com/nailpalace');
  });
});
