/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// FAQ Item Interface
interface FAQItem {
  question: string;
  answer: string;
}

// Sample FAQs
const faqs: FAQItem[] = [
  {
    question: "How do I change my profile?",
    answer: "To change your Profile Information, click on the Profile button at the top of the homepage."
  },
  {
    question: "How can I contact support?",
    answer: "You can contact support by emailing us at styleislamitp@gmail.com or by using the contact form below."
  },
  
];

const HelpPage = () => {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray">
            <div className="max-w-screen-xl mx-auto p-12 bg-white shadow-lg rounded-lg"> 
                <h1 className="text-4xl font-bold text-center mb-6">Help Page</h1>

                <section className="faq-section mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                    <ul className="list-disc pl-5">
                        {faqs.map((faq, index) => (
                            <li key={index} className="mb-4">
                                <h3 className="font-medium">{faq.question}</h3>
                                <p>{faq.answer}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="contact-section">
                    <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
                    <p>If you need further assistance, please reach out to us:</p>
                    <p>Email: <a href="mailto:styleislamitp@gmail.com" className="text-blue-600 underline">styleislamitp@gmail.com</a></p>
                    <p>Or fill out the <a href="/contact" className="text-blue-600 underline">contact form</a>.</p>
                </section>
            </div>   
        </div>
    );
};

export default HelpPage;
