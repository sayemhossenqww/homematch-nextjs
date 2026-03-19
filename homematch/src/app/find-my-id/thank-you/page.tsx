import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Search, FileText, Building2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Request Received — We'll Be in Touch | HomeMatch",
  description: "Your interior designer matching request has been received. Our team will contact you within 1 business day with your 6 personalised CaseTrust-certified firm recommendations.",
  robots: { index: false, follow: false },
};

export default function FindMyIdSuccessPage() {
  return (
    <div className="min-h-screen bg-[#05080f] pt-32 pb-24 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c8881f]/10 blur-[120px] rounded-full pointer-events-none" />

      <ScrollReveal className="max-w-2xl mx-auto text-center relative z-10 w-full">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-[#c8881f]/15 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#c8881f]/30 relative">
          <div className="absolute inset-0 bg-[#c8881f]/20 rounded-full animate-ping opacity-50" />
          <CheckCircle className="w-10 h-10 text-[#c8881f]" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
          You're on your way to your <span className="text-gradient">dream home.</span>
        </h1>
        
        <p className="text-xl text-white/60 mb-12 leading-relaxed">
          We've received your details. Our matching team reviews every request manually and will contact you <strong className="text-white">within 24 hours</strong> with your 6 matched CaseTrust firms.
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-white/20 mx-auto mb-12" />

        <h3 className="text-lg font-semibold text-white mb-8">While you wait, explore HomeMatch:</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/inspirations" className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group group-hover:-translate-y-1 flex flex-col items-center text-center">
            <Search className="w-8 h-8 text-[#c8881f] mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <h4 className="text-sm font-semibold text-white mb-2">Browse Projects</h4>
            <p className="text-xs text-white/50">Get ideas from 1,400+ homes</p>
          </Link>
          
          <Link href="/articles/hdb-renovation-complete-guide-2025" className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group group-hover:-translate-y-1 flex flex-col items-center text-center">
            <FileText className="w-8 h-8 text-[#c8881f] mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <h4 className="text-sm font-semibold text-white mb-2">Read Guides</h4>
            <p className="text-xs text-white/50">Learn about costs & timelines</p>
          </Link>
          
          <Link href="/firms" className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group group-hover:-translate-y-1 flex flex-col items-center text-center">
            <Building2 className="w-8 h-8 text-[#c8881f] mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <h4 className="text-sm font-semibold text-white mb-2">Explore Firms</h4>
            <p className="text-xs text-white/50">See all our verified IDs</p>
          </Link>
        </div>
      </ScrollReveal>

    </div>
  );
}
