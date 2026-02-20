import { ContactHero, ContactForm, ContactMap } from '@/components/dashboard/contact';

export const metadata = {
    title: 'Contact - Social Shipping',
    description: 'Contact Social Shipping for support, press or partnership enquiries.',
};

export default function ContactPage() {
    return (
        <main className="w-full bg-white">
            <ContactHero />
            <section className="w-full py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-12">
                        {/* Form - Left Side */}
                        <div className="lg:col-span-7">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Drop Us a Line</h2>
                            <p className="text-slate-600 mb-8">Get in touch via the form below and we will reply as soon as we can.</p>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
            <ContactMap />
        </main>
    );
}
