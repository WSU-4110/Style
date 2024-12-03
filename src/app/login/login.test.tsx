import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./page"; // Adjust path as necessary
import { useRouter } from "next/navigation";
import axios from "axios";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock axios
jest.mock("axios");

describe("Login Component", () => {
  let mockPush: jest.Mock;


  
  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(<Login />);
    expect(screen.getByText("Login To Style").textContent).toBe("Login To Style");
    expect(screen.getByLabelText("Email")).toBeTruthy();
    expect(screen.getByLabelText("Password")).toBeTruthy();
    expect(screen.getByText("Remember Me").textContent).toBe("Remember Me");
    expect(screen.getByRole("button", { name: "Login" }).textContent).toBe("Login");
  });

  it("loads remembered user from localStorage", () => {
    const rememberedUser = JSON.stringify({
      email: "test@example.com",
      password: "",
      rememberMe: true,
    });
    localStorage.setItem("rememberedUser", rememberedUser);

    render(<Login />);
    expect((screen.getByLabelText("Email") as HTMLInputElement).value).toBe("test@example.com");
    expect((screen.getByLabelText("Remember Me") as HTMLInputElement).checked).toBe(true);
  });

  it("handles input changes correctly", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("submits the form and redirects on success", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: { success: true } });

    render(<Login />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(axios.post).toHaveBeenCalledWith("/api/users/login", {
      email: "test@example.com",
      password: "password123",
      rememberMe: false,
    });
    expect(mockPush).toHaveBeenCalledWith("/Portfolio");
  });

  it("handles form errors correctly", async () => {
    (axios.post as jest.Mock).mockRejectedValue({
      response: { status: 401, data: { message: "Account not activated" } },
    });

    render(<Login />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    const errorMessage = await screen.findByText("Account not activated");
    expect(errorMessage.textContent).toBe("Account not activated");
  });

  it("toggles login and signup views", () => {
    render(<Login />);
    const toggleLink = screen.getByText("Create Account");

    fireEvent.click(toggleLink);

    expect(screen.getByText("Sign Up with Style").textContent).toBe("Sign Up with Style");
    expect(screen.getByRole("button", { name: "Create Account" }).textContent).toBe("Create Account");
  });
});
