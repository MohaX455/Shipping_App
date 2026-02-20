export function ContactMap() {
    return (
        <section className="w-full py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full h-74 md:h-116 rounded-lg overflow-hidden border border-slate-200">
                    <iframe
                        title="office-location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9954110085606!2d2.3477137761508006!3d48.85293971077976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6701d94b35edb%3A0x4c0200b3b5b5b3b5!2sParis%2C%20France!5e0!3m2!1sen!2sfr!4v1234567890123"
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
