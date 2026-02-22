import Link from 'next/link'

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
                        <span className="text-[#4053a1] font-medium">Contact Us</span>
                    </nav>
                </div>

            </section>
        </main>
    );
}
