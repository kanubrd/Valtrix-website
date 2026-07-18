'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20">
      <Section className="bg-white py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#17A2B8]" />
              <span className="text-sm font-medium text-[#2C3E50]">Legal & Privacy</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-sm">
              Last Updated: June 20, 2026
            </p>
          </div>

          <div className="prose prose-blue max-w-none text-gray-600 space-y-8 leading-relaxed">
            <Reveal>
              <section className="bg-[#F8FAFB] p-6 rounded-xl border border-gray-100">
                <h2 className="text-xl font-bold text-[#2C3E50] mb-3">Overview</h2>
                <p>
                  VAM VALTRIX (Valtrix Advance Material Pvt. Ltd, "we", "us", "our") is committed to protecting the privacy and security of your personal data. This Privacy Policy explains how we collect, use, store, and process your personal information when you use our website, request quotes, or contact us.
                </p>
                <p className="mt-2">
                  This policy is designed to comply with global privacy standards, including the **General Data Protection Regulation (GDPR)** for individuals in the European Economic Area (EEA), and the **Digital Personal Data Protection Act, 2023 (DPDPA 2023)** of India.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">1. Data We Collect</h2>
                <p>
                  We only collect personal data that is necessary to provide you with our B2B services, request quotes, and respond to inquiries. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Identity Data:</strong> Full Name.</li>
                  <li><strong>Contact Data:</strong> Email address, phone number.</li>
                  <li><strong>Professional Data:</strong> Company name, job title, industry, and material sourcing requirements.</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, location information (country level), and usage metrics collected via cookies.</li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">2. Purpose of Collection & Legal Basis</h2>
                <p>
                  We collect and process your personal data under the following legal bases:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Performance of a Contract:</strong> To process your material sourcing quotes, manage your account, and fulfill order requirements.</li>
                  <li><strong>Consent:</strong> When you subscribe to our newsletter or opt-in to marketing communications.</li>
                  <li><strong>Legitimate Interests:</strong> To secure our website, prevent spam/abuse (via Google reCAPTCHA), and understand user behavior to improve our services.</li>
                  <li><strong>Legal Obligation:</strong> To comply with tax, corporate governance, and export control regulations in India and international jurisdictions.</li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">3. Data Retention</h2>
                <p>
                  We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including satisfying any legal, accounting, or reporting requirements:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Quote & Sourcing Requests:</strong> Maintained as active business history. Inactive accounts are archived after 5 years unless requested otherwise.</li>
                  <li><strong>Newsletter Subscriptions:</strong> Retained until you opt-out or unsubscribe.</li>
                  <li><strong>Technical Logs & Analytics:</strong> Retained for a maximum of 12 months.</li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">4. Your Rights</h2>
                <p>
                  Depending on your jurisdiction (such as India under the DPDPA or the EU under the GDPR), you have specific rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Right to Access:</strong> You can request a copy of the personal data we hold about you.</li>
                  <li><strong>Right to Correction:</strong> You can request that we correct incomplete or inaccurate data.</li>
                  <li><strong>Right to Erasure (Right to be Forgotten):</strong> You can request that we delete your personal data when it is no longer needed.</li>
                  <li><strong>Right to Restriction:</strong> You can request that we restrict processing of your data in certain circumstances.</li>
                  <li><strong>Right to Data Portability:</strong> You can request the transfer of your data in a structured, machine-readable format.</li>
                  <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent for newsletters or cookies at any time.</li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">5. Data Security & International Transfers</h2>
                <p>
                  Your information is stored securely on servers located in India and hostings configured via Vercel. We implement appropriate technical security measures (SSL encryption, firewalls, rate limiting) to prevent unauthorized access, loss, or alteration of data.
                </p>
                <p>
                  For global clients, your data may be processed outside the EEA. We ensure appropriate safeguards (such as Standard Contractual Clauses) are in place to secure these transfers.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-bold text-[#2C3E50] mb-3">6. Data Requests and Grievances</h2>
                <p>
                  To exercise any of your rights or submit a query/grievance regarding your personal data, please contact our Data Protection Officer:
                </p>
                <div className="mt-4 text-sm space-y-1 text-gray-700">
                  <p><strong>Email:</strong> privacy@valtrixmaterials.com</p>
                  <p><strong>Address:</strong> 318, Fortune Gateway, Chhani, Vadodara - 390024, Gujarat, India</p>
                  <p><strong>Response Time:</strong> We aim to respond to all valid requests within 30 days.</p>
                </div>
              </section>
            </Reveal>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
