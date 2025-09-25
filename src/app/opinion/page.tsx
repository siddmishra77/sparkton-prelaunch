'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OpinionForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);  // new state


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);  // start submitting
        try {
            const res = await fetch('/api/submit-opinion', {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                // Optionally handle server errors here
                alert('Failed to submit. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);  // end submitting
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-4">
            {/* Header */}
            <header className="flex items-center justify-between px-4 md:px-12 py-4 backdrop-blur-sm bg-white/5 rounded-b-xl shadow-md sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <img src="/logo.jpg" alt="Logo" className="w-10 h-10 object-contain rounded-full" />

                    <h1 className="text-2xl font-semibold tracking-tight">Sparkton</h1>
                </div>
                <Link href="/">
                    <button className="text-sm px-4 py-1 rounded-full bg-white/10 hover:bg-white/20 transition">
                        ← Back to Home
                    </button>
                </Link>
            </header>

            {/* Form Container */}
            <div className="flex flex-col items-center justify-center mt-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-extrabold mb-4"
                >
                    We&apos;d Love Your Opinion 💬
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg max-w-xl mb-8 text-gray-300"
                >
                    Your feedback helps us build the perfect learning experience. Tell us what you think!
                </motion.p>

                {!submitted ? (
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="w-full max-w-md bg-white/5 backdrop-blur-lg p-6 rounded-xl space-y-4 shadow-lg"
                    >
                        <input
                            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            name="message"
                            placeholder="Your thoughts, queries, or any suggestion.."
                            rows={5}
                            onChange={handleChange}
                            required
                        />
                          <button
                            type="submit"
                            disabled={isSubmitting} // disable while submitting
                            className={`w-full py-3 rounded-full font-semibold transition duration-300 cursor-pointer
                                ${isSubmitting
                                    ? 'bg-green-700 text-white cursor-not-allowed'
                                    : 'bg-yellow-400 text-black hover:bg-yellow-300'
                                }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </motion.form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/10 p-8 rounded-xl max-w-md shadow-xl"
                    >
                        <p className="text-xl font-semibold text-white">🎉 Thank you for your opinion!</p>
                        <p className="text-gray-300 mt-2">We truly appreciate your input. We&apos;ll be in touch!</p>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
