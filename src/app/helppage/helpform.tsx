// HelpForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HelpFormValues {
  name: string;
  email: string;
  message: string;
}

const HelpForm: React.FC = () => {
  const [formValues, setFormValues] = useState<HelpFormValues>({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch('/api/help-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          router.push('/helppage');
        }, 2000);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto border border-gray-600 bg-white p-6 rounded-lg shadow-md mt-12">
      <h1 className="text-2xl font-semibold text-gray-900 text-center mb-4 font-sans">Help Form</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-800">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#85b5b7]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-800">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full p-2.5 mt-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#85b5b7]"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-800">Message</label>
            <textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleChange}
              className="w-full p-2.5 mt-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#85b5b7]"
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-[#7fd1db] rounded-md hover:bg-[#63b0b3] transition-colors"
          >
            Submit
          </button>
        </form>
      ) : (
        <p className="text-center text-lg text-gray-700">Thank you for reaching out to Style! We will get back to you soon.</p>
      )}
    </div>
  );
};

export default HelpForm;
