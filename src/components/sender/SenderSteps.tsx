import Image from 'next/image';
import Link from 'next/link';

interface SenderPageData {
    first_title?: string;
    first_descriptions?: string;
    first_image?: string;
    second_title?: string;
    second_descriptions?: string;
    second_image?: string;
    third_title?: string;
    third_descriptions?: string;
    third_image?: string;
    fourth_title?: string;
    fourth_descriptions?: string;
    fourth_image?: string;
}

interface SenderStepsProps {
    senderData?: SenderPageData;
}

export function SenderSteps({ senderData }: SenderStepsProps) {
    return (
        <section className="w-full bg-slate-50 py-12">
            <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-md mb-8 font-body">
                    <Link href="/" className="text-slate-600 hover:text-[#4053a1]">
                        Welcome
                    </Link>
                    <span className="text-slate-400">{" / "}</span>
                    <span className="text-[#4053a1] font-medium">For Senders</span>
                </nav>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-4 font-heading">
                    I am a <span className="text-[#4053a1]">SENDER</span>
                </h2>
                <p className="text-center text-slate-700 text-base sm:text-lg mb-12 font-body">
                    Simply follow these four easy steps
                </p>

                <div className="space-y-16">

                    {/* STEP 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 items-stretch">
                        <div className="bg-white p-6 lg:p-8 flex flex-col justify-center min-h-[280px] h-full">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-[#4053a1] text-white flex items-center justify-center font-bold font-heading">
                                    1
                                </div>
                                <h4 className="text-xl sm:text-2xl font-semibold text-[#4053a1] font-heading uppercase">
                                    {senderData?.first_title || 'upload your order'}
                                </h4>
                            </div>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {senderData?.first_descriptions || 'Add your order details including a link for the traveler to send the item through and the suggested for the traveler.'}
                            </p>
                        </div>

                        <div className="relative w-full min-h-[280px] h-full bg-slate-200">
                            <Image
                                src={senderData?.first_image || '/Images/sender-img01.webp'}
                                alt="Step 1"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* STEP 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 items-stretch">
                        <div className="relative w-full min-h-[280px] h-full bg-slate-200 md:order-1">
                            <Image
                                src={senderData?.second_image || '/Images/sender-img02.webp'}
                                alt="Step 2"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="bg-white p-6 lg:p-8 flex flex-col justify-center min-h-[280px] h-full md:order-2">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-[#4053a1] text-white flex items-center justify-center font-bold font-heading">
                                    2
                                </div>
                                <h4 className="text-xl sm:text-2xl font-semibold text-[#4053a1] font-heading uppercase">
                                    {senderData?.second_title || 'wait for a delivery offer'}
                                </h4>
                            </div>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {senderData?.second_descriptions || 'Travelers will make delivery offers and you can choose the one that suits you best. You can use the chat feature in the website to discuss and agree with the traveler on all the details including the item description and delivery time and location.'}
                            </p>
                        </div>
                    </div>

                    {/* STEP 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 items-stretch">
                        <div className="bg-white p-6 lg:p-8 flex flex-col justify-center min-h-[280px] h-full">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-[#4053a1] text-white flex items-center justify-center font-bold font-heading">
                                    3
                                </div>
                                <h4 className="text-xl sm:text-2xl font-semibold text-[#4053a1] font-heading uppercase">
                                    {senderData?.third_title || 'accept offer and pay'}
                                </h4>
                            </div>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {senderData?.third_descriptions || 'Users pay for delivery services without Social Shipping involvement. Choose the payment method when you create a parcel: upon receipt or upon departure.'}
                            </p>
                        </div>

                        <div className="relative w-full min-h-[280px] h-full bg-slate-200">
                            <Image
                                src={senderData?.third_image || '/Images/sender-img03.webp'}
                                alt="Step 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* STEP 4 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 items-stretch">
                        <div className="relative w-full min-h-[280px] h-full bg-slate-200 md:order-1">
                            <Image
                                src={senderData?.fourth_image || '/Images/sender-img04.webp'}
                                alt="Step 4"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="bg-white p-6 lg:p-8 flex flex-col justify-center min-h-[280px] h-full md:order-2">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-[#4053a1] text-white flex items-center justify-center font-bold font-heading">
                                    4
                                </div>
                                <h4 className="text-xl sm:text-2xl font-semibold text-[#4053a1] font-heading uppercase">
                                    {senderData?.fourth_title || 'Deliver your shipping item'}
                                </h4>
                            </div>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {senderData?.fourth_descriptions || 'Successful delivery of your package when you, or the recipient, provides a delivery confirmation to the traveler.'}
                            </p>
                        </div>
                    </div>

                </div>

                {/* CTA */}
                <div className="flex items-center justify-center mt-12 font-heading">
                    <Link
                        href="/dashboard"
                        className="inline-block bg-[#00fcff] text-[#252b50] font-semibold text-lg px-8 py-3 rounded-md hover:bg-[#00e5e5] transition-colors"
                    >
                        Send You Parcel
                    </Link>
                </div>
            </div>
        </section>
    );
}