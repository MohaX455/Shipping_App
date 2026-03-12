import Image from 'next/image'
import { IMAGE_BASE } from '@/lib/constants'

export const ContactBanner = () => {
    return (
        <div className="relative w-full h-60 lg:h-110 bg-slate-200">
            <Image
                src={`${IMAGE_BASE}/contact-us.webp`}
                alt="banner"
                width={1600}
                height={450}
                className="w-full h-full object-cover"
                priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 w-full max-w-4xl">
                    <h3 className="text-3xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white uppercase mb-4 font-heading">
                        GET-IN TOUCH
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-white font-medium font-body">
                        If you have any questions or suggestions, please contact with us
                    </p>
                </div>
            </div>
        </div>
    )
}