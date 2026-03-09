import Image from 'next/image';

interface SenderBannerProps {
    bannerData?: {
        banner?: string;
        banner_title?: string;
        banner_descriptions?: string;
    };
}

export function SenderBanner({ bannerData }: SenderBannerProps) {
    return (
        <div className="relative w-full">
            <div className="relative w-full h-60 lg:h-110 bg-slate-200">
                <Image
                    src={bannerData?.banner || '/Images/sender-banner.webp'}
                    alt="Sender Banner"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4 w-full max-w-4xl">
                        <h3 className="text-3xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white uppercase mb-4 font-heading">
                            {bannerData?.banner_title || 'For Senders'}
                        </h3>
                        <p className="text-base sm:text-lg lg:text-xl text-white font-medium font-body">
                            {bannerData?.banner_descriptions || 'Send parcels affordably with Social Shipping'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
