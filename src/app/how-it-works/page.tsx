import { HowItWorksBanner, HowItWorksConcept, HowItWorksSteps } from '@/components/how-it-works';

export const metadata = {
    title: 'How It Works - Social Shipping',
    description: 'Understand how Social Shipping connects senders and travelers. Learn our direct matching process and platform role.',
};

export default function HowItWorksPage() {
    return (
        <main className="w-full bg-slate-50">
            <HowItWorksBanner />
            <HowItWorksConcept />
            <HowItWorksSteps />
        </main>
    );
}
