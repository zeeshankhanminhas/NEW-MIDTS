import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Process from '@/components/Process';
import Proof from '@/components/Proof';
import Services from '@/components/Services';
import TrustStrip from '@/components/TrustStrip';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Problem />
      <Services />
      <Process />
      <Proof />
      <CTA />
      <Footer />
    </main>
  );
}
