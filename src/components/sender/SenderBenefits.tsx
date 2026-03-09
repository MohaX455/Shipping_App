import Image from 'next/image';

interface Benefit {
    image?: string;
    title?: string;
    descriptions?: string;
}

interface SenderBenefitsProps {
    benefits?: Benefit[];
}

export function SenderBenefits({ benefits = [] }: SenderBenefitsProps) {
    // Fallback data si pas de données API
    const defaultBenefits = [
        {
            image: '/Images/sender-img05.webp',
            title: 'Cheap',
            descriptions: 'Much cheaper than traditional shipping options. You negotiate your own delivery fee.',
        },
        {
            image: '/Images/sender-img06.webp',
            title: 'Flexible and Fast',
            descriptions: 'Expanded, personalized shipping options to anywhere someone travels. Anytime.',
        },
        {
            image: '/Images/sender-img07.webp',
            title: 'Protection',
            descriptions: 'Only pay if package is successfully delivered. Get reimbursed if your package is lost or damaged.',
        },
    ];

    const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;

    return (
        <section className="w-full bg-white py-16 sm:py-20">
            <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-3xl sm:text-4xl font-semibold text-center mb-12 font-heading">
                    Benefits For Senders
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 font-body">
                    {displayBenefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="relative w-18 h-18 sm:w-22 sm:h-22">
                                    <Image
                                        src={benefit.image || '/Images/sender-img05.webp'}
                                        alt={benefit.title || `Benefit ${index + 1}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <h4 className="text-xl font-semibold text-[#252b50] mb-4 font-heading">
                                {benefit.title}
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {benefit.descriptions}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
