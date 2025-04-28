import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AuthPage = () => {
  // State for form data
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!isLogin) {
        // Signup - using environment variable for API URL
        const response = await fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            display_name: displayName
          }),
          credentials: 'include', // For cookies if you're using session-based auth
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.detail || 'Something went wrong');
        }
        
        setSuccess('Account created successfully! You can now log in.');
        // Optional: Auto switch to login
        setTimeout(() => setIsLogin(true), 2000);
      } else {
        // Login - To be implemented
        console.log('Login functionality not implemented yet');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-indigo-800 p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Sliding Content */}
          <div className="relative">
            {/* Form Header */}
            <div className="flex border-b">
              <button
                onClick={() => setIsLogin(false)}
                className={`w-1/2 py-4 text-center font-medium text-lg ${!isLogin ? 'text-purple-600' : 'text-gray-500'}`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsLogin(true)}
                className={`w-1/2 py-4 text-center font-medium text-lg ${isLogin ? 'text-purple-600' : 'text-gray-500'}`}
              >
                Login
              </button>
              
              {/* Sliding Indicator */}
              <motion.div 
                className="absolute bottom-0 h-1 bg-purple-600"
                initial={{ width: '50%', x: isLogin ? '100%' : '0%' }}
                animate={{ x: isLogin ? '100%' : '0%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ width: '50%' }}
              />
            </div>

            {/* Form Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center mb-6">
                {isLogin ? 'Welcome Back!' : 'Create Your Account'}
              </h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Display Name - Only for signup */}
                {!isLogin && (
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="displayName">
                      Display Name
                    </label>
                    <input
                      id="displayName"
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="Your name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : isLogin ? 'Login' : 'Sign Up'}
                </button>
              </form>

              {/* Alternative Action */}
              <div className="text-center mt-4">
                <span className="text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>{' '}
                <button
                  className="text-purple-600 hover:underline font-medium"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign up here' : 'Login here'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;