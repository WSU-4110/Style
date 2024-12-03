import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CalendarPage from './page';  
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';
import { clear } from 'console';


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  describe('CalendarPage', () => {
    let mockPush: jest.Mock;
  
    beforeEach(() => {
      mockPush = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    });
  
    
    //first
    it('renders the title correctly', () => {
      render(<CalendarPage />);
      expect(screen.getByText('Schedule Your Appointment')).toBeInTheDocument();
    });


    //second
    it('displays the month selector correctly', () => {
        render(<CalendarPage />);
        const monthSelect = screen.getByLabelText('Select a Month');
        expect(monthSelect).toBeInTheDocument();
        expect(monthSelect).toHaveValue('October 2024');
      });

      
      //third
      it('displays calendar dates for the selected month', () => {
        render(<CalendarPage />);
        const dates = screen.getAllByRole('button', { name: /\d+/ });
        expect(dates).toHaveLength(31); 
      });

      
      //fourth
      it('allows the user to select a date', () => {
        render(<CalendarPage />);
        const dateButton = screen.getByLabelText('Select 2024-10-01'); 
        fireEvent.click(dateButton);
        expect(dateButton).toHaveClass('bg-teal-600'); 
      }); 
      

      //fifth
      it('renders the period selection after a date is selected', async () => {
        render(<CalendarPage />);
        
        const dateButton = screen.getByRole('button', { name: 'Select 2024-10-01' });
        fireEvent.click(dateButton);
    
        const periodButtons = await screen.findAllByRole('button', { name: /Morning|Afternoon|Evening/ });
        
        expect(periodButtons.length).toBe(3);
    }); 


    //sixth
    test('should confirm appointment correctly', async () => {
        render(<CalendarPage />);
    
        const dateButton = screen.getAllByRole('button')[0];
        fireEvent.click(dateButton);
    
        const periodButton = screen.getByText('Morning');
        fireEvent.click(periodButton);
    
        await waitFor(() => {
          const timeButton = screen.getByText(/9:00 AM/i); 
          fireEvent.click(timeButton);
        });
    
        const confirmButton = screen.getByRole('button', { name: /Confirm/i });
        fireEvent.click(confirmButton);
    
        await waitFor(() => {
          expect(screen.getByText(/Appointment confirmed/)).toBeInTheDocument();
        });
      });
    
});
