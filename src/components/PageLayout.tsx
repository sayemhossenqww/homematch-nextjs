import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";

interface PageLayoutProps {
  children: React.ReactNode;
  bodyClass?: string;
}

export default function PageLayout({ children, bodyClass }: PageLayoutProps) {
  return (
    <>
      <Navbar />
      <main className={bodyClass}>
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
