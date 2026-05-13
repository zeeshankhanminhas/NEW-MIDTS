import CTA from '@/components/CTA';
import EnquiryForm from '@/components/EnquiryForm';
import FAQ from '@/components/FAQ';
import Fit from '@/components/Fit';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Process from '@/components/Process';
import Proof from '@/components/Proof';
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
        <Process />
        <Proof />
        <Fit />
        <FAQ />
        <Testimonials />
        <CTA />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  );
}
