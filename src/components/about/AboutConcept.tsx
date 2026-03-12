import Link from 'next/link'
import Image from 'next/image';
import { IMAGE_BASE } from '@/lib/constants';

export function AboutConcept() {

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
                        <span className="text-[#4053a1] font-medium">About Us</span>
                    </nav>
                </div>
            </section>
            <section className="pb-12">
                <div className="max-w-330 mx-auto px-6 md:px-0">
                    {/* Images row */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        {/* Left image card - measured frame (633×593) */}
                        <div
                            className="bg-white flex-shrink-0 w-full lg:w-[650px] lg:h-[425px] overflow-hidden"
                            aria-hidden
                        >
                            <Image
                                src={`${IMAGE_BASE}/about-img01.webp`} // exemple : ${IMAGE_BASE}/traveler-example.jpg
                                alt="Traveler with luggage"
                                width={650}
                                height={425}
                                className="object-cover w-full h-full"
                                priority
                            />
                        </div>

                        {/* Right image card - measured frame (542×636) */}
                        <div
                            className="bg-white flex-shrink-0 w-full lg:w-[422px] lg:h-[500px] overflow-hidden"
                            aria-hidden
                        >
                            <Image
                                src={`${IMAGE_BASE}/about-yamocart.webp`} // exemple : ${IMAGE_BASE}/phone-example.jpg
                                alt="Phone app mockup"
                                width={422}
                                height={500}
                                className="object-cover w-full h-full"
                                priority
                            />
                        </div>
                    </div>

                    {/* Text block (identique à l'image) */}
                    <div className="text-center mt-12 md:mt-16">
                        <h2 className="font-extrabold text-lg md:text-xl lg:text-2xl text-gray-900">
                            Shipping anywhere, traveler carries package to everywhere
                        </h2>

                        <p className="mt-4 text-sm md:text-base text-gray-600 max-w-5xl mx-auto leading-relaxed font-medium">
                            Social Shipping is a social network that connects Senders with Travelers. Connecting travelers who have extra luggage space to people with shipping and ship with a Traveler already heading their way. Senders save money shipping &amp; Travelers make money traveling.
                        </p>
                    </div>
                </div>
            </section>

        </main>
    );
}
