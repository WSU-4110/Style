import { render, screen, fireEvent } from '@testing-library/react';
import Login from "../login/page";
import HelpPage from "../helppage/page";
import CalendarPage from '../schedule/page';  
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import '@testing-library/jest-dom';
import { describe } from "node:test";

// ----------------------------------------------------------------- Endri Worked On Login Component ------------------------------------------------------------------


import React from 'react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('axios');

describe('Login Component', () => {
  let mockPush;

  beforeEach(() => {
    // Reset mock implementations before each test
    jest.clearAllMocks();

    mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush,
    });

    localStorage.clear();
  });

  it('renders the component correctly', () => {
    render(<Login />);
    expect(screen.getByText('Login To Style')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Remember Me')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('loads remembered user from localStorage', () => {
    const rememberedUser = JSON.stringify({
      email: 'test@example.com',
      password: '',
      rememberMe: true,
    });
    localStorage.setItem('rememberedUser', rememberedUser);

    render(<Login />);
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember Me')).toBeChecked();
  });

  it('handles input changes correctly', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('submits the form and redirects on success', async () => {
    // Mock a successful response from the API
    axios.post.mockResolvedValueOnce({ data: { success: true } });
  
    render(<Login />); // Render the component
  
    // Simulate input changes
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  
    // Simulate form submission
    fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
  
    // Wait for the axios.post call and subsequent actions
    await screen.findByText('Login To Style');
  
    // Assert that axios.post was called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith('/api/users/login', {
      email: 'test@example.com',
      password: 'password123',
      rememberMe: false,
    });
  
    // Assert that the router's push method was called with "/Portfolio"
    const router = useRouter();
    expect(router.push).toHaveBeenCalledWith('/Portfolio');
  });
  

  it('handles form errors correctly', async () => {
    // Mock a 401 response
    axios.post.mockRejectedValueOnce({
      response: { status: 401 },
    });
  
    render(<Login />);
    
    // Simulate input changes
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    
    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  
    // Check for the error message displayed
    const errorMessage = await screen.findByText('An unexpected error occurred');
    expect(errorMessage).toBeInTheDocument();
  });

  it('toggles login and signup views', () => {
    render(<Login />);
    const toggleLink = screen.getByText('Create Account');

    fireEvent.click(toggleLink);

    expect(screen.getByText('Sign Up with Style')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });
});

// ----------------------------------------------------------------- Sapana Worked on Calendar unit test ------------------------------------------------------------------


describe('CalendarPage', () => {
  let mockPush;

  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
  });

  it('renders the title correctly', () => {
    render(CalendarPage());
    expect(screen.getByText('Schedule Your Appointment')).toBeInTheDocument();
  });

  it('displays the month selector correctly', () => {
    render(CalendarPage());
    const monthSelect = screen.getByLabelText('Select a Month');
    expect(monthSelect).toBeInTheDocument();
    expect(monthSelect).toHaveValue('October 2024');
  });

  it('displays calendar dates for the selected month', () => {
    render(CalendarPage());
    const dates = screen.getAllByRole('button', { name: /\d+/ });
    expect(dates).toHaveLength(31);
  });

  it('allows the user to select a date', () => {
    render(CalendarPage());
    const dateButton = screen.getByLabelText('Select 2024-10-01');
    fireEvent.click(dateButton);
    expect(dateButton).toHaveClass('bg-teal-600');
  });

  it('renders the period selection after a date is selected', async () => {
    render(CalendarPage());

    const dateButton = screen.getByRole('button', { name: 'Select 2024-10-01' });
    fireEvent.click(dateButton);

    const periodButtons = await screen.findAllByRole('button', { name: /Morning|Afternoon|Evening/ });

    expect(periodButtons.length).toBe(3);
  });

  it('confirms the appointment correctly', async () => {
    render(CalendarPage());

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

// ----------------------------------------------------------------- Nawal Worked On Help Page unit test ------------------------------------------------------------------



describe('HelpPage Component', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders the page correctly', () => {
    render(HelpPage());
    expect(screen.getByText('Help Page')).toBeInTheDocument();
  });

  it('displays FAQ items correctly', () => {
    render(HelpPage());
    expect(screen.getByText('How do I change my profile?')).toBeInTheDocument();
    expect(screen.getByText('To change your Profile Information, click on the Profile button at the top of the homepage.')).toBeInTheDocument();
  });

  it('displays contact support section correctly', () => {
    render(HelpPage());
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
    expect(screen.getByText('If you need further assistance, please reach out to us:')).toBeInTheDocument();
  });

  it('displays the contact form link correctly', () => {
    render(HelpPage());
    const emailLink = screen.getByText('styleislamitp@gmail.com');
    expect(emailLink).toHaveAttribute('href', 'mailto:styleislamitp@gmail.com');
  });

  it('displays FAQ answer correctly', () => {
    render(HelpPage());
    expect(screen.getByText('To change your Profile Information...')).toBeInTheDocument();
  });

  it('displays the correct support message', () => {
    render(HelpPage());
    expect(screen.getByText(/If you need further assistance/)).toBeInTheDocument();
  });
});


// ----------------------------------------------------- Ragad Worked On Nail Salon ----------------------------------------------------------------------