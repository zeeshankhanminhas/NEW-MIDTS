import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Process from '@/components/Process';
import Proof from '@/components/Proof';
import ProofOfWork from '@/components/ProofOfWork';
import Services from '@/components/Services';
import TrustStrip from '@/components/TrustStrip';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <Services />
        <Process />
        <ProofOfWork />
        <Proof />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
