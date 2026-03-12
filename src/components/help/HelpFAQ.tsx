import { Gift, Umbrella, Wallet, Plus } from "lucide-react";

export function HelpFAQ() {
    const faqs = [
        {
            q: 'What can I use Social Shipping for?',
            a: 'Shipping - You can use Social Shipping to ship packages to others. Expanded, personalized shipping options to anywhere someone travels. Anytime.',
            icon: (
                <Gift />
            ),
        },
        {
            q: 'How is my package protected? What if my package gets lost or damaged?',
            a: 'Shipping - You can use Social Shipping to ship packages to others. Expanded, personalized shipping options to anywhere someone travels. Anytime.',
            icon: (
                <Umbrella />
            ),
        },
        {
            q: 'How do I pay a traveler for delivering my package?',
            a: 'Shipping - You can use Social Shipping to ship packages to others. Expanded, personalized shipping options to anywhere someone travels. Anytime.',
            icon: (
                <Wallet />
            ),
        },
    ];

    return (
        <section className="w-full py-12 sm:py-16 lg:py-20">
            <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full mx-auto">
                    <h2 className="text-center text-xl sm:text-2xl font-bold text-slate-900 mb-4 font-heading">
                        FAQ For Senders
                    </h2>
                    <p className="text-center text-slate-600 mb-6 font-body">
                        How to send parcels with Social Shipping
                    </p>

                    <div className="space-y-3">
                        {faqs.map((f, i) => (
                            <details
                                key={i}
                                className="group rounded-lg border border-slate-200 bg-white transition"
                            >
                                <summary className="flex items-center justify-between cursor-pointer list-none p-3">

                                    {/* Left Section */}
                                    <div className="flex items-center gap-3">
                                        <span className="shrink-0 w-5 h-5 md:w-6 md:h-6">
                                            {f.icon}
                                        </span>
                                        <span className="text-slate-800 font-medium font-heading text-sm md:text-base">
                                            {f.q}
                                        </span>
                                    </div>

                                    {/* Animated + icon */}
                                    <div className="relative flex items-center justify-center">
                                        <Plus className="w-5 h-5 md:w-6 md:h-6 text-slate-600 transition-transform duration-300 group-open:rotate-45" />
                                    </div>

                                </summary>

                                <div className="px-4 pb-4 text-slate-600 font-body text-sm">
                                    {f.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}