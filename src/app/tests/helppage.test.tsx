import { render, screen } from "@testing-library/react";
import HelpPage from "../helppage/page";
import { useRouter } from "next/navigation";

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