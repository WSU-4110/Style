'use client'


export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6">Login to Style</h1>
        <form className="w-full max-w-md">
          <label htmlFor="login-email" className="block text-sm text-gray-600">Email</label>
          <input
            type="text"
            id="login-email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full p-3 mt-2 border rounded-md"
          />
          <label htmlFor="login-password" className="block text-sm text-gray-600 mt-4">Password</label>
          <input
            type="password"
            id="login-password"
            name="password"
            placeholder="•••••••••••"
            required
            className="w-full p-3 mt-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}