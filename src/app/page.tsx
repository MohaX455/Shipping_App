import { HeroSection } from '@/components/home/HeroSection';
import { ValuePropositionSection } from '@/components/home/ValuePropositionSection';
import { UpcomingTravelersSection } from '@/components/home/UpcomingTravelersSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { FAQSection } from '@/components/home/FAQSection';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <UpcomingTravelersSection />
            <ValuePropositionSection />
            <HowItWorksSection />
            <FAQSection />
        </>
    );
}
