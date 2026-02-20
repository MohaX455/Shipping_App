'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Send } from 'lucide-react';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().required('Phone number is required'),
    subject: Yup.string().required('Subject is required'),
    query: Yup.string().required('Message is required'),
});

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile: '',
            subject: '',
            query: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Form submitted:', values);
                alert('Message sent! We will get back to you soon.');
                resetForm();
            } catch (error) {
                console.error('Error submitting form:', error);
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                        Your Name
                    </label>
                    <input
                        type="text"
                        {...formik.getFieldProps('name')}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${formik.touched.name && formik.errors.name
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-300 focus:ring-blue-500'
                            }`}
                        placeholder="John Doe"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                        Email ID
                    </label>
                    <input
                        type="email"
                        {...formik.getFieldProps('email')}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${formik.touched.email && formik.errors.email
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-300 focus:ring-blue-500'
                            }`}
                        placeholder="your@email.com"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                        Phone No.
                    </label>
                    <input
                        type="tel"
                        {...formik.getFieldProps('mobile')}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${formik.touched.mobile && formik.errors.mobile
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-300 focus:ring-blue-500'
                            }`}
                        placeholder="+1 (555) 000-0000"
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.mobile}</p>
                    )}
                </div>

                {/* Subject */}
                <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                        Subject
                    </label>
                    <input
                        type="text"
                        {...formik.getFieldProps('subject')}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${formik.touched.subject && formik.errors.subject
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-300 focus:ring-blue-500'
                            }`}
                        placeholder="What is this about?"
                    />
                    {formik.touched.subject && formik.errors.subject && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.subject}</p>
                    )}
                </div>
            </div>

            {/* Query/Message - Full Width */}
            <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Your Query
                </label>
                <textarea
                    {...formik.getFieldProps('query')}
                    rows={5}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition resize-none ${formik.touched.query && formik.errors.query
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-slate-300 focus:ring-blue-500'
                        }`}
                    placeholder="Tell us more about your query..."
                />
                {formik.touched.query && formik.errors.query && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.query}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? 'Sending...' : 'Send Message'}
                {!isLoading && <Send className="w-4 h-4" />}
            </button>
        </form>
    );
}
