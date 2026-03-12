import { ContactBanner, ContactSectionWithForm, ContactMap } from '@/components/contact/'

export default function ContactPage() {

    return (
        <main className="w-full bg-slate-50">
            <ContactBanner />
            <ContactSectionWithForm />
            <ContactMap />
        </main>
    )
}