import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import Fit from '@/components/Fit';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Proof from '@/components/Proof';
import ProofOfWork from '@/components/ProofOfWork';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
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
        <ProofOfWork />
        <Proof />
        <Fit />
        <FAQ />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
