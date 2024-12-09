/**
 * Final Test File
 * Consolidates all unit tests for the project.
 * Note: This file contains tests for Login, Calendar, and HelpPage components.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from "../login/page";
import HelpPage from "../helppage/page";
import CalendarPage from '../schedule/page';  
import { useRouter } from "next/navigation";
import axios from "axios";
import '@testing-library/jest-dom';

// ----------------------------------------------------------------- Endri Worked On Login Component ------------------------------------------------------------------


// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock axios
jest.mock("axios");

describe("Login Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    localStorage.clear();
  });

  it("renders the component correctly", () => {
    render(<Login />);
    expect(screen.getByText("Login To Style")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Remember Me")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("loads remembered user from localStorage", () => {
    const rememberedUser = JSON.stringify({ email: "test@example.com", password: "", rememberMe: true });
    localStorage.setItem("rememberedUser", rememberedUser);

    render(<Login />);
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    expect(screen.getByLabelText("Remember Me")).toBeChecked();
  });

  it("handles input changes correctly", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("submits the form and redirects on success", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (axios.post as jest.Mock).mockResolvedValueOnce({ data: { success: true } });

    render(<Login />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await screen.findByText("Login To Style"); // Wait for updates
    expect(axios.post).toHaveBeenCalledWith("/api/users/login", {
      email: "test@example.com",
      password: "password123",
      rememberMe: false,
    });

    expect(mockPush).toHaveBeenCalledWith("/Portfolio");
  });

  it("handles form errors correctly", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { status: 401 },
    });

    render(<Login />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    const errorMessage = await screen.findByText("Account not activated");
    expect(errorMessage).toBeInTheDocument();
  });

  it("toggles login and signup views", () => {
    render(<Login />);
    const toggleLink = screen.getByText("Create Account");

    fireEvent.click(toggleLink);

    expect(screen.getByText("Sign Up with Style")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create Account" })).toBeInTheDocument();
  });
});


// ----------------------------------------------------------------- Sapana Worked on Calender unit test ------------------------------------------------------------------




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



// ----------------------------------------------------------------- Nawal Worked On Help Page unit test ------------------------------------------------------------------


// using mock Next.js router to avoid errors in tests
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("HelpPage Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(), 
    });
  });

  it("renders the page correctly", () => {
    render(<HelpPage />);
    expect(screen.getByText("Help Page")).toBeInTheDocument();
  });

  it("displays FAQ items correctly", () => {
    render(<HelpPage />);
    expect(screen.getByText("Help Page")).toBeInTheDocument();
    expect(screen.getByText("How do I change my profile?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "To change your Profile Information, click on the Profile button at the top of the homepage."
      )
    ).toBeInTheDocument();
  });

  it("displays contact support section correctly", () => {
    render(<HelpPage />);
    expect(screen.getByText("Contact Support")).toBeInTheDocument();
    expect(
      screen.getByText("If you need further assistance, please reach out to us:")
    ).toBeInTheDocument();
  });

  it("displays the contact form link correctly", () => {
    render(<HelpPage />);
    const emailLink = screen.getByText("styleislamitp@gmail.com");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:styleislamitp@gmail.com"); 

    const contactFormLink = screen.getByText("contact form");
    expect(contactFormLink).toBeInTheDocument();
    expect(contactFormLink).toHaveAttribute("href", "/contact");
  });

  it("displays FAQ answer correctly", () => {
    render(<HelpPage />);
    expect(
      screen.getByText(
        "You can contact support by emailing us at styleislamitp@gmail.com or by using the contact form below."
      )
    ).toBeInTheDocument();
  });

  it("displays correct support message", () => {
    render(<HelpPage />);
    expect(
      screen.getByText(/If you need further assistance, please reach out to us/i)
    ).toBeInTheDocument();
  });

});
