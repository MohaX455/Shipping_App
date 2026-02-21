import Image from 'next/image';
import { IMAGE_BASE } from '../../lib/constants'

export function HowItWorksSection() {
    const steps = [
        {
            icon: `${IMAGE_BASE}/home-img02.webp`, // legacy image
            title: 'Find a matching traveler or sender',
            description:
                'Social Shipping matches travelers with extra luggage space to senders who need to send packages along the same route.',
        },
        {
            icon: `${IMAGE_BASE}/home-img03.webp`,
            title: 'Agree on a delivery fee',
            description:
                'Traveler and sender negotiate a delivery fee using Social Shipping. Payment information is provided to Social Shipping as collateral.',
        },
        {
            icon: `${IMAGE_BASE}/home-img01.webp`,
            title: 'Deliver',
            description:
                'Traveler carries package to destination and gets confirmation code from recipient. Social Shipping transfers payment to traveler on successful confirmation of delivery.',
        },
    ];

    return (
        <section className="py-20 bg-[#f3f4f6]">
            <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl font-semibold text-slate-600">
                        How It Works
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg p-10 text-center relative"
                        >
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="relative h-35 w-35 overflow-hidden bg-white flex items-center justify-center">
                                    <Image
                                        src={step.icon}
                                        alt={step.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-[#1f2a44] mb-4">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {step.description}
                            </p>

                            {/* Bottom line */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-[2px] bg-[#1f2a44]" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}