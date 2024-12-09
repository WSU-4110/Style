import HelpPage from "../helppage/page";
import { useRouter } from "next/navigation";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CalendarPage from '../schedule/page';  
import { clear } from 'console';
import NailSalonPage from '../nailsalon/page';
import Login from "../login/page";
import axios from "axios";


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
    jest.clearAllMocks();
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
    const rememberedUser = JSON.stringify({
      email: "test@example.com",
      rememberMe: true,
    });
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

    (axios.post as jest.Mock).mockResolvedValue({ data: { success: true } });

    render(<Login />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/users/login", {
        email: "test@example.com",
        password: "password123",
        rememberMe: false,
      });
      expect(mockPush).toHaveBeenCalledWith("/Portfolio");
    });
  });

  it("shows a generic error message for unexpected errors", async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error("Network Error"));

    render(<Login />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    const errorMessage = await screen.findByText("An unexpected error occurred");
    expect(errorMessage).toBeInTheDocument();
  });

  it("toggles login and signup views", () => {
    render(<Login />);
    const toggleLink = screen.getByText("Create Account");

    fireEvent.click(toggleLink);

    expect(screen.getByText("Sign Up with Style")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create Account" })).toBeInTheDocument();

    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByText("Login To Style")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });
});


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