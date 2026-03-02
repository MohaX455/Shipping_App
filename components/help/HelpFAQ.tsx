export function HelpFAQ() {
    const faqs = [
        {
            q: 'What can I use Social Shipping for?',
            a: 'Shipping - You can use Social Shipping to ship packages to others. Expanded, personalized shipping options to anywhere someone travels. Anytime.',
        },
        {
            q: 'How is my package protected? What if my package gets lost or damaged?',
            a: 'Shipping - You can use Social Shipping to ship packages to others. Expanded, personalized shipping options to anywhere someone travels. Anytime.',
        },
        {
            q: 'How do I pay a traveler for delivering my package?',
            a: 'Shipping - You can use Social Shipping to ship packages to others. Expanded, personalized shipping options to anywhere someone travels. Anytime.',
        },
    ];

    return (
        <section className="w-full py-12 sm:py-16 lg:py-20">
            <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full mx-auto">
                    <h2 className="text-center text-xl sm:text-2xl font-bold text-slate-900 mb-4 font-heading">FAQ For Senders</h2>
                    <p className="text-center text-slate-600 mb-6 font-body">How to send parcels with Social Shipping</p>
                    <div className="space-y-3">
                        {faqs.map((f, i) => (
                            <details key={i} className="group rounded-lg border border-slate-200 p-4 bg-white">
                                <summary className="cursor-pointer list-none text-slate-800 font-medium font-heading">{f.q}</summary>
                                <div className="mt-3 text-slate-600 font-body text-sm">{f.a}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
