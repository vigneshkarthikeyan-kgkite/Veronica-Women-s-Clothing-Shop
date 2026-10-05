import React from 'react';
import { ShieldCheck, HelpCircle, RotateCcw, Truck } from 'lucide-react';

interface FooterProps {
  onOpenFitStudio: () => void;
  onOpenPassport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFitStudio, onOpenPassport }) => {
  return (
    <footer className="bg-[#172337] text-white pt-12 pb-8 border-t border-stone-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Flipkart Trust Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-10 border-b border-stone-700/60 text-stone-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#ffe500]" />
            <div>
              <div className="font-bold text-white text-xs">Veronica Assured</div>
              <div className="text-[11px] text-stone-400">100% Custom Tailored Guarantee</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-8 h-8 text-[#ffe500]" />
            <div>
              <div className="font-bold text-white text-xs">60 Days Free Alteration</div>
              <div className="text-[11px] text-stone-400">Free Doorstep Pickup & Fit Tuning</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-[#ffe500]" />
            <div>
              <div className="font-bold text-white text-xs">Express Delivery</div>
              <div className="text-[11px] text-stone-400">Hand-cut & Stitched in 48 Hours</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-[#ffe500]" />
            <div>
              <div className="font-bold text-white text-xs">Tailor Concierge</div>
              <div className="text-[11px] text-stone-400">Expert Fit Support 24x7</div>
            </div>
          </div>
        </div>

        {/* Flipkart-Style 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-stone-700/60 text-stone-400">
          <div>
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
              ABOUT VERONICA
            </div>
            <ul className="space-y-1.5 text-stone-300">
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Made-to-Measure Story
                </a>
              </li>
              <li>
                <button onClick={onOpenFitStudio} className="hover:text-white transition-colors text-left cursor-pointer">
                  Fit Drafter Studio
                </button>
              </li>
              <li>
                <a href="#silhouettes" className="hover:text-white transition-colors">
                  Diverse Body Inclusivity
                </a>
              </li>
              <li>
                <span className="text-stone-400">Zero Linear Grading Rule</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
              HELP & FIT SUPPORT
            </div>
            <ul className="space-y-1.5 text-stone-300">
              <li>
                <button onClick={onOpenPassport} className="hover:text-white transition-colors text-left cursor-pointer">
                  Measurement Passport
                </button>
              </li>
              <li>
                <span className="text-stone-400">How to Measure at Home</span>
              </li>
              <li>
                <span className="text-stone-400">Free Alteration Booking</span>
              </li>
              <li>
                <span className="text-stone-400">Track Stitched Order</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
              POLICY & PROMISES
            </div>
            <ul className="space-y-1.5 text-stone-300">
              <li>
                <span className="text-stone-300">Zero Waist Gap Policy</span>
              </li>
              <li>
                <span className="text-stone-300">Anti-Gape Chest Guarantee</span>
              </li>
              <li>
                <span className="text-stone-300">Terms of Use</span>
              </li>
              <li>
                <span className="text-stone-300">Privacy Policy</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
              REGISTERED ATELIER OFFICE
            </div>
            <p className="text-stone-300 leading-relaxed text-[11px]">
              Veronica Tailored Women's Wear Ltd,<br />
              Embassy Tech Village, Outer Ring Road,<br />
              Devarabeesanahalli Village, Bengaluru, 560103,<br />
              Karnataka, India.<br />
              CIN: U51109KA2026PTC066107
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-stone-400 text-[11px] gap-2">
          <div>
            © 2026 Veronica.com · Custom-Fitted Women's Clothing for Every Silhouette
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <span>Become a Seller</span>
            <span>·</span>
            <span>Advertise</span>
            <span>·</span>
            <span>Help Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
