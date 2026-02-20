export function ContactInfo() {
    return (
        <section className="w-full py-12 sm:py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-lg border border-slate-200">
                        <h4 className="text-lg font-semibold mb-2 font-heading">Email</h4>
                        <p className="text-slate-600 font-body">support@socialshipping.example</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg border border-slate-200">
                        <h4 className="text-lg font-semibold mb-2 font-heading">Location</h4>
                        <p className="text-slate-600 font-body">Paris, France (Head office)</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg border border-slate-200">
                        <h4 className="text-lg font-semibold mb-2 font-heading">Phone</h4>
                        <p className="text-slate-600 font-body">+33 1 23 45 67 89</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
