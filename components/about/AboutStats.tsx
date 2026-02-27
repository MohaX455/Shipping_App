import Image from 'next/image';
import { IMAGE_BASE } from '@/lib/constants';

export const AboutStats = () => {
    const stats = [
        {
            icon: `${IMAGE_BASE}/about-icon.webp`,
            title: '10K',
            description: 'Regitered Users'
        },
        {
            icon: `${IMAGE_BASE}/about-icon01.webp`,
            title: '115K',
            description: 'Shipments Posted'
        },
        {
            icon: `${IMAGE_BASE}/about-icon02.webp`,
            title: '5K',
            description: 'Trips Posted'
        }
    ]
    return (
        <section className="pt-12 bg-gray-50">

            <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-0 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 justify-between">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex items-center text-center md:text-left mb-8 md:mb-0 min-w-fit w-50"
                        >
                            <div className='p-2 bg-white rounded-md border'>
                                <Image
                                    src={stat.icon}
                                    alt={stat.description}
                                    height={35}
                                    width={35}
                                    className="mx-auto h-full w-full"
                                />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-bold text-blue-900">{stat.title}</h3>
                                <p className="text-base text-gray-600">{stat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image banner */}
            <div className="max-w-330 w-full md:mt-16 mx-auto px-1 md:px-0">
                <div className="relative w-full h-30 lg:h-110">
                    <Image
                        src={'/Images/about-banner01.webp'}
                        alt="About Banner"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>
            </div>

        </section>
    )
}

export default AboutStats