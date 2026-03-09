import Link from 'next/link';
import Image from 'next/image'
import { IMAGE_BASE } from '@/lib/constants';

export function HelpContent() {
    const topics = [
        {
            icon: `${IMAGE_BASE}/help-img01.svg`,
            title: 'Get Started',
            text: 'Learn how to set up your account, make offers, and earn money on the shipping needs.',
        },
        {
            icon: `${IMAGE_BASE}/help-img04.svg`,
            title: 'General Info',
            text: 'Fast facts about Social Shipping, such as how it works and other frequently asked questions.',
        },
        {
            icon: `${IMAGE_BASE}/help-img03.svg`,
            title: 'For Sender',
            text: 'Much cheaper than traditional shipping options. You negotiate your own delivery fee.',
        },
        {
            icon: `${IMAGE_BASE}/help-img02.svg`,
            title: 'For Travelers',
            text: 'Best practices for travelers, make money by carrying packages you\'re comfortable with.',
        },
    ];

    return (
        <main className="middle contact-page">
            <section className="w-full py-12">
                <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-md mb-8 font-body">
                        <Link href="/" className="text-slate-600 hover:text-[#4053a1]">
                            Welcome
                        </Link>
                        <span className="text-slate-400">{" / "}</span>
                        <span className="text-[#4053a1] font-medium">Contact Us</span>
                    </nav>
                </div>
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-330 mx-auto px-4 md:px-0">
                    {topics.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg"
                        >
                            {/* Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="relative h-20 w-20 overflow-hidden bg-white hover: flex items-center justify-center">
                                    <Image
                                        src={step.icon}
                                        alt={step.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-[#4053a1] mb-6">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
