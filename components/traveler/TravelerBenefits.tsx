import Image from 'next/image';

interface Benefit {
    image?: string;
    title?: string;
    descriptions?: string;
}

interface TravelerBenefitsProps {
    benefits?: Benefit[];
}

export function TravelerBenefits({ benefits = [] }: TravelerBenefitsProps) {
    // Fallback data si pas de données API
    const defaultBenefits = [
        {
            image: '/Images/traveler-img05.webp',
            title: 'Make Extra Cash',
            descriptions: 'Make money by carrying packages you\'re comfortable with.',
        },
        {
            image: '/Images/traveler-img06.webp',
            title: 'Travel for Free',
            descriptions: 'Want to travel somewhere nice for free? Just find enough packages to deliver to cover the cost of your trip.',
        },
        {
            image: '/Images/traveler-img07.webp',
            title: 'Help Friends and Family',
            descriptions: 'Make it easy for friends and family to know when you\'re traveling and can help deliver packages.',
        },
    ];

    const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;

    return (
        <section className="w-full bg-white py-16 sm:py-20">
            <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-3xl sm:text-4xl font-semibold text-center mb-12">
                    Benefits For Travelers
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {displayBenefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                                    <Image
                                        src={benefit.image || '/Images/traveler-img05.webp'}
                                        alt={benefit.title || `Benefit ${index + 1}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <h4 className="text-xl font-semibold text-[#252b50] mb-4">
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
