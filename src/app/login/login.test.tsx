import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Login";
import { useRouter } from "next/navigation";
import axios from "axios";

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
