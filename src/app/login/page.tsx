// pages/page.tsx
'use client';


import React, { useState } from 'react'; // Import React explicitly
import { useRouter } from 'next/navigation';  // Import useRouter
import router from 'next/router';



export default function Login() {
  const [isLogin, setIsLogin] = React.useState(true);

  const toggleForms = () => {
    setIsLogin(!isLogin);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock authentication logic (replace with actual login/signup logic)
    const isAuthenticated = true; // Mock successful login/signup

    if (isAuthenticated) {
      router.push('/Portfolio'); // Redirect to Portfolio page after successful login/signup
    } else {
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6">
          {isLogin ? 'Login To Style' : 'Sign Up with Style'}
        </h1>

        {isLogin ? (
          <form className="w-full max-w-md">
            <label htmlFor="login-email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              type="text"
              id="login-email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />
            <label htmlFor="login-password" className="block text-sm text-gray-600 mt-4">
              Password
            </label>
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
        ) : (
          <form className="w-full max-w-md">
            <label htmlFor="createacc-email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="createacc-email"
              name="email"
              placeholder="Email address"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />
            <label htmlFor="createacc-username" className="block text-sm text-gray-600 mt-4">
              Username
            </label>
            <input
              type="text"
              id="createacc-username"
              name="username"
              placeholder="Username"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />
            <label htmlFor="createacc-password" className="block text-sm text-gray-600 mt-4">
              Password
            </label>
            <input
              type="password"
              id="createacc-password"
              name="password"
              placeholder="•••••••••••"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />
            <label htmlFor="createacc-confirm-password" className="block text-sm text-gray-600 mt-4">
              Confirm Password
            </label>
            <input
              type="password"
              id="createacc-confirm-password"
              name="confirm_password"
              placeholder="•••••••••••"
              required
              className="w-full p-3 mt-2 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-600"
            >
              Create Account
            </button>
          </form>
        )}

        <p className="mt-4">
          {isLogin ? 'Need a Style account?' : 'Already have an account?'}{' '}
          <a
            href="#"
            onClick={toggleForms}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'Create Account' : 'Login'}
          </a>
        </p>
      </div>
    </div>
  );
}




// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import NextButton from '@/components/buttons/SignInPageButton'; // Custom button component
// import { useAuth } from '@/app/authContext'; // Auth context for managing user state
// import ShortHeader from '@/components/ShortHeader'; // Custom header

// export default function LoginPage() {
//   const { isLoggedIn, setIsLoggedIn } = useAuth();
//   const { showModal, setShowModal } = useAuth(); 
//   const router = useRouter();
//   const [error, setError] = useState("");
//   const [user, setUser] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });

//   useEffect(() => {
//     const storedUser = localStorage.getItem('rememberedUser');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const onLogin = async (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent page refresh on form submit
//     try {
//       const response = await axios.post("/api/users/login", user);
//       setIsLoggedIn(true);
//       setShowModal(false);

//       await axios.get('/api/users/grabUserEmail');
//       console.log("Login success", response.data);
      
//       if (user.rememberMe) {
//         localStorage.setItem('rememberedUser', JSON.stringify(user));
//       } else {
//         localStorage.removeItem('rememberedUser');
//       }

//       // Redirect to the Portfolio page after successful login
//       router.push("/Portfolio");

//     } catch (error: any) {
//       console.log('login failed', error.message);
//       if (error.response && error.response.status === 400){
//         setError("User does not exist");
//       } else if (error.response && error.response.status === 300){
//         setError("Invalid email format");
//       } else if (error.response && error.response.status === 401){
//         setError("Account not activated");
//       } else if (error.response && error.response.status === 500){
//         setError("Invalid login credentials");
//       }
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <ShortHeader /> {/* Assuming you have a header component */}

//       <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
//         <h1 className="text-4xl font-bold mb-6">Login To Style</h1>
//         {error && <p className="text-red-500">{error}</p>}

//         <form onSubmit={onLogin} className="w-full max-w-md">
//           <label htmlFor="email" className="block text-sm text-gray-600">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={user.email}
//             onChange={handleInputChange}
//             placeholder="Enter your email"
//             required
//             className="w-full p-3 mt-2 border rounded-md"
//           />

//           <label htmlFor="password" className="block text-sm text-gray-600 mt-4">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={user.password}
//             onChange={handleInputChange}
//             placeholder="•••••••••••"
//             required
//             className="w-full p-3 mt-2 border rounded-md"
//           />
//           <div className="flex items-center mt-2">
//             <input
//               type="checkbox"
//               id="rememberMe"
//               name="rememberMe"
//               checked={user.rememberMe}
//               onChange={() => setUser((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))}
//             />
//             <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">Remember Me</label>
//           </div>

//           <div className="flex items-center justify-between mt-4">
//             <Link href="/forgot-password" className="text-blue-500 hover:underline">
//               Forgot Password?
//             </Link>
//           </div>

//           <NextButton type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-600">
//             Login
//           </NextButton>
//         </form>

//         <p className="mt-4">
//           Need an account?{' '}
//           <Link href="/signup" className="text-blue-500 hover:underline">
//             Create one here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }