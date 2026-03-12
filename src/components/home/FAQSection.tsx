'use client';

import { useState } from 'react';
import { Gift, ArrowDown } from 'lucide-react';

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
        question: 'Where can I get some?',
        answer:
            'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    },
    {
        id: 'sender-2',
        type: 'sender',
        question: 'Where does it come from?',
        answer:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    },
    {
        id: 'sender-3',
        type: 'sender',
        question: 'Why do we use it?',
        answer:
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    },
    {
        id: 'sender-4',
        type: 'sender',
        question: 'What is Lorem Ipsum?',
        answer:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
        id: 'traveler-1',
        type: 'traveler',
        question: '1914 translation by H. Rackham1',
        answer:
            'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',
    },
    {
        id: 'traveler-2',
        type: 'traveler',
        question: 'Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC',
        answer:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    },
    {
        id: 'traveler-3',
        type: 'traveler',
        question: 'The standard Lorem Ipsum passage, used since the 1500s',
        answer:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
];

export function FAQSection() {
    const [activeTab, setActiveTab] = useState<'sender' | 'traveler'>('sender');
    const [openId, setOpenId] = useState<string | null>(null);

    const filteredFaqs = faqData.filter((faq) => faq.type === activeTab);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
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
                    <p className="text-base text-slate-600 font-body">
                        {activeTab === 'sender'
                            ? 'How to send parcels with Social Shipping'
                            : 'How to deliver parcels with Social Shipping and make money'}
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
                                className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-colors"
                            >
                                <div className="flex items-center gap-4 text-left">
                                    {/* Gift Icon */}
                                    <span className="shrink-0 w-5 h-5 md:w-6 md:h-6">
                                        <Gift />
                                    </span>

                                    <span className="font-semibold text-slate-900 text-base font-heading">
                                        {faq.question}
                                    </span>
                                </div>
                                <ArrowDown
                                    className={`w-5 h-5 md:w-6 md:h-6 text-slate-600 flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {openId === faq.id && (
                                <div className="px-6 py-4 bg-white border-t border-slate-200">
                                    <p className="text-sm text-slate-600 leading-relaxed font-body">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
