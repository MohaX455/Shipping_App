import { IMAGE_BASE } from '@/lib/constants';
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaYoutube
} from "react-icons/fa";

export function Footer() {
    return (
        <section className="footer-banner relative w-full">
            <div className="absolute inset-0 -z-10">
                <img
                    src={`${IMAGE_BASE}/footer-banner.webp`}
                    alt="footer banner"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="flex flex-col md:flex-row md:items-center">

                    <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-6 md:mb-0">
                        <img
                            src={`${IMAGE_BASE}/footer-logo.webp`}
                            alt="logo1"
                            className="max-h-64 h-full"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="footer-follow-us text-center md:text-right">
                            <h4 className="text-white text-lg font-semibold">Follow Us</h4>

                            <ul className="flex justify-center md:justify-end items-center gap-6 mt-3 flex-wrap">
                                <li>
                                    <a href="#" className="facebook text-white" target="_blank" rel="noreferrer" aria-label="facebook">
                                        <FaFacebookF className="w-6 h-6" />
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="twitter text-white" target="_blank" rel="noreferrer" aria-label="twitter">
                                        <FaTwitter className="w-6 h-6" />
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="linkedin text-white" target="_blank" rel="noreferrer" aria-label="linkedin">
                                        <FaLinkedinIn className="w-6 h-6" />
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="instagram text-white" target="_blank" rel="noreferrer" aria-label="instagram">
                                        <FaInstagram className="w-6 h-6" />
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="youtube text-white" target="_blank" rel="noreferrer" aria-label="youtube">
                                        <FaYoutube className="w-6 h-6" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-about mt-4 text-center md:text-right text-white text-base">
                            <p>Copyright @ 2023 Social Shipping. All rights reserved.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}