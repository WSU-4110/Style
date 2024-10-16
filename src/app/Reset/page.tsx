// /* eslint-disable @typescript-eslint/no-unused-vars */


// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function ResetPassword() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const router = useRouter();

//   const handleResetPassword = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Mock reset password logic (replace with real API call)
//     if (email === 'test@example.com') {
//       setSuccess(true);
//       setTimeout(() => {
//         router.push('/login'); // Redirect to login after successful password reset
//       }, 2000);
//     } else {
//       setError('Email not found. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="container mt-10 p-8 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
//         <h1 className="text-4xl font-bold mb-6">Reset Password</h1>
        
//         {success ? (
//           <p className="text-green-500">Password reset link sent! Redirecting to login...</p>
//         ) : (
//           <form onSubmit={handleResetPassword} className="w-full max-w-md">
//             <label htmlFor="email" className="block text-sm text-gray-600">
//               Enter your email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//               className="w-full p-3 mt-2 border rounded-md"
//             />
//             {error && <p className="text-red-500 mt-2">{error}</p>}

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-600"
//             >
//               Reset Password
//             </button>
//           </form>
//         )}

//         <p className="mt-4">
//           Remember your password?{' '}
//           <a href="/login" className="text-blue-500 hover:underline">
//             Go back to login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
