import React, { useState } from 'react'
import axios from 'axios'

const backendURL = `${import.meta.env.VITE_BACKEND_URL}sendMail`

function App() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.')
      return;
    }

    try {
      const response = await axios.post(
        backendURL,
        {
          firstName,
          lastName,
          email,
        }
      );

      setMessage('Email sent successfully!')
    } catch (error) {
      setMessage('There was an error sending the email.')
      console.error('Error:', error)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Onboading Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-2 rounded-md text-center ${
              message === 'Email sent successfully!'
                ? 'bg-green-200 text-green-700'
                : 'bg-red-200 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
