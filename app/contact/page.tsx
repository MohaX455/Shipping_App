import Image from 'next/image'
import ContactForm from '@/components/contact/ContactForm'
import Link from 'next/link'
import { IMAGE_BASE } from '@/lib/constants'

export default function ContactPage() {
    // The legacy used dynamic `contactData`; here we render the same structure.
    const contactData: any = {}
    const contactBannerSrc = contactData && contactData.banner ? contactData.banner : `${IMAGE_BASE}/contact-us.webp`

    return (
        <section className="bg-slate-50">
            <div className="relative w-full h-60 lg:h-110 bg-slate-200">
                <Image
                    src={contactBannerSrc}
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

            <main className="middle contact-page">
                <section className="w-full py-12">
                    <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-md mb-8 font-body">
                            <Link href="/" className="text-slate-600 hover:text-[#4053a1]">
                                Welcome
                            </Link>
                            <span className="text-slate-400">{" / "}</span>
                            <span className="text-[#4053a1] font-medium">Contact Us</span>
                        </nav>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-7">
                                <h2 className="c-heading text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">Drop Us a Line</h2>
                                <p className="text-slate-700 text-base sm:text-lg mb-12 font-body">Get in touch via form below and we will reply as soos as we can.</p>
                                <ContactForm />
                            </div>

                            <div className="md:col-span-5 space-y-6 md:space-y-10">
                                <div className="work-box h-auto mb-5 p-5 rounded-md bg-white border border-slate-200 flex flex-col items-center text-center py-6 md:py-10">
                                    <Image src={`${IMAGE_BASE}/box.webp`} alt="box" width={70} height={70} />
                                    <h3 className="text-[#4053a1] font-bold text-2xl mt-4">Drop a Mail</h3>
                                    <h5 className='mt-4'>
                                        <a href={`mailto:${contactData ? contactData.first_email : ''}`}>{contactData ? contactData.first_email : ''} SocialShipping@gmail.com</a>
                                    </h5>
                                    <h5>
                                        <a href={`mailto:${contactData ? contactData.second_email : ''}`}>{contactData ? contactData.second_email : ''} info.socialshipping@gmail.com</a>
                                    </h5>
                                </div>

                                <div className="work-box h-auto mb-5 p-5 rounded-md bg-white border border-slate-200 flex flex-col items-center text-center py-6 md:py-10">
                                    <Image src={`${IMAGE_BASE}/call.webp`} alt="call" width={80} height={80} />
                                    <h3 className="text-[#4053a1] font-bold text-2xl mt-4">Call Us</h3>
                                    <h5 className='mt-4'>
                                        <a href={`tel:${contactData ? contactData.first_no : ''}`}>{contactData ? contactData.first_no : ''} 05222563568, 9876543210</a>,{' '}
                                        <a href={`tel:${contactData ? contactData.second_no : ''}`}>{contactData ? contactData.second_no : ''}</a>
                                    </h5>
                                </div>

                                <div className="work-box h-auto mb-5 p-5 rounded-md bg-white border border-slate-200 flex flex-col items-center text-center py-6 md:py-10">
                                    <Image src={`${IMAGE_BASE}/whatsapp.webp`} alt="whatsapp" width={80} height={80} />
                                    <h3 className="text-[#4053a1] font-bold text-2xl mt-4">Chat with us</h3>
                                    <h5 className='mt-4'>
                                        <a href={`https://api.whatsapp.com/send?phone=${contactData ? contactData.whatsapp_no : ''}`}>Start a conversation on WhatsApp {contactData ? contactData.whatsapp_no : ''} 1234567890</a>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="sec-padd">
                    <div className="max-w-330 mx-auto px-4">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.579341486233!2d77.20735924710138!3d28.61239388408227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1703840013952!5m2!1sen!2sin"
                            width="100%"
                            height={450}
                            loading="lazy"
                            style={{ border: 0 }}
                        />
                    </div>
                </section>
            </main>
        </section>
    )
}