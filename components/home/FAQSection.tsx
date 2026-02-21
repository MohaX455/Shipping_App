'use client';

import { useState } from 'react';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    type: 'sender' | 'traveler';
}

const faqData: FAQItem[] = [
    {
        id: 'sender-1',
        type: 'sender',
        question: 'How do I send a parcel with Social Shipping?',
        answer:
            'Post your shipping request with details of your parcel. Browse available travelers going your route and negotiate a delivery fee directly with them through our platform.',
    },
    {
        id: 'sender-2',
        type: 'sender',
        question: 'Is my parcel insured?',
        answer:
            'Yes, all parcels are verified and travelers are required to have insurance. Social Shipping holds payment until successful delivery confirmation.',
    },
    {
        id: 'sender-3',
        type: 'sender',
        question: 'What are the cost savings?',
        answer:
            'Depending on the route and traveler availability, you can save up to 50% compared to traditional shipping services.',
    },
    {
        id: 'traveler-1',
        type: 'traveler',
        question: 'How do I earn money as a traveler?',
        answer:
            'List your upcoming trips on our platform. Senders will contact you with parcel delivery requests. You negotiate the fee and earn money once delivery is confirmed.',
    },
    {
        id: 'traveler-2',
        type: 'traveler',
        question: 'Do I need special training or licenses?',
        answer:
            'No special training is required. We verify all travelers and provide guidelines. You just need to be reliable and trustworthy.',
    },
    {
        id: 'traveler-3',
        type: 'traveler',
        question: 'What if a parcel gets lost or damaged?',
        answer:
            'All parcels are insured. If there\'s an issue, contact our support team and we\'ll handle the claim. Payment is held until delivery confirmation.',
    },
];

export function FAQSection() {
    const [activeTab, setActiveTab] = useState<'sender' | 'traveler'>('sender');
    const [openId, setOpenId] = useState<string | null>(null);

    const filteredFaqs = faqData.filter((faq) => faq.type === activeTab);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Tabs */}
                <div className="flex gap-4 mb-12 border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab('sender')}
                        className={`px-6 py-3 font-semibold transition-colors font-heading ${activeTab === 'sender'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        For Senders
                    </button>
                    <button
                        onClick={() => setActiveTab('traveler')}
                        className={`px-6 py-3 font-semibold transition-colors font-heading ${activeTab === 'traveler'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        For Travelers
                    </button>
                </div>

                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl text-slate-600 font-semibold block mb-4">
                            Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-600 font-body">
                        {activeTab === 'sender'
                            ? 'How to send parcels with Social Shipping'
                            : 'How to deliver parcels and make money'}
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {filteredFaqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="border border-slate-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
                        >
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-colors"
                            >
                                <span className="text-left font-semibold text-slate-900 text-lg font-heading">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-6 h-6 text-slate-600 flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </button>

                            {openId === faq.id && (
                                <div className="px-6 py-4 bg-white border-t border-slate-200">
                                    <p className="text-slate-600 leading-relaxed font-body">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
