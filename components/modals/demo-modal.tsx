'use client';

import { Modal } from '@/components/ui/modal';
import { Play, Zap, Shield, BarChart3, Users } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted?: () => void;
}

export function DemoModal({ isOpen, onClose, onGetStarted }: DemoModalProps) {
  const handleGetStarted = () => {
    onClose();
    onGetStarted?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="See How VAM VALTRIX Works">
      <div className="space-y-4 sm:space-y-5">
        <p className="text-sm text-[#6B7280]">
          See how VAM VALTRIX cuts procurement cycles from weeks to days — without sacrificing traceability or spec
          compliance.
        </p>
        <div className="aspect-video bg-gradient-to-br from-[#2C3E50] to-[#17A2B8] rounded-xl flex items-center justify-center">
          <div className="text-center">
            <button className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#17A2B8] ml-1" />
            </button>
            <p className="text-white/80 text-sm">3-minute product walkthrough</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">How it works</p>
          {[
            {
              icon: Zap,
              step: '01',
              title: 'Submit your spec',
              desc: 'Upload your material requirements or describe what you need.',
            },
            {
              icon: Shield,
              step: '02',
              title: 'We match & verify',
              desc: 'Our engine finds the best-fit supplier from our verified sources.',
            },
            {
              icon: BarChart3,
              step: '03',
              title: 'Track in real time',
              desc: 'Monitor your order from confirmation to delivery on your dashboard.',
            },
            {
              icon: Users,
              step: '04',
              title: 'Dedicated support',
              desc: 'A sourcing specialist is assigned to every account.',
            },
          ].map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#EEF2F7] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#E6F7FA] border border-[#D1F2F7] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#17A2B8]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C3E50]">{title}</p>
                <p className="text-xs text-[#6B7280]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleGetStarted}
          className="w-full py-3.5 text-white font-semibold min-h-[44px]"
          style={{ background: '#17A2B8', borderRadius: 0 }}
        >
          Get Started Now →
        </button>
      </div>
    </Modal>
  );
}
