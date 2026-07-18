'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';

export default function TermsOfUsePage() {
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
              <span className="text-sm font-medium text-[#2C3E50]">Legal Terms</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-4">
              Terms of Use
            </h1>
            <p className="text-gray-500 text-sm">
              Last Updated: June 20, 2026
            </p>
          </div>

          <div className="prose prose-blue max-w-none text-gray-600 space-y-8 leading-relaxed">
            <Reveal>
              <section className="bg-[#F8FAFB] p-6 rounded-xl border border-gray-100">
                <h2 className="text-xl font-bold text-[#2C3E50] mb-3">Acceptance of Terms</h2>
                <p>
                  By accessing and using the website of VAM VALTRIX (Valtrix Advance Material Pvt. Ltd, "we", "us", "our"), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">1. B2B Eligibility & Website Use</h2>
                <p>
                  This website is intended solely for B2B (business-to-business) procurement, engineering, and material supply operations. By using this website, you warrant that you are representing a valid business entity and are authorized to make inquiries or requests on its behalf.
                </p>
                <p>
                  You agree to use this site only for lawful purposes. You are prohibited from attempting to bypass site security, spamming form submissions, or scraping database content.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">2. Requesting Quotes</h2>
                <p>
                  Our platform allows you to submit requests for quotes (RFQs) for advanced materials.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Accuracy of Specs:</strong> You are responsible for ensuring that the technical specifications, quantities, and timelines provided in your RFQ are accurate.</li>
                  <li><strong>Non-binding Nature:</strong> Submitting a request for a quote does not create a binding contract. All prices and lead times supplied in response to an RFQ are estimates until formally confirmed in a signed purchase order.</li>
                  <li><strong>Verification:</strong> We reserve the right to verify the authenticity of any company or representative before providing material quotes.</li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">3. Intellectual Property</h2>
                <p>
                  All content on this website, including logo, text, graphics, designs, images, and software, is the property of VAM VALTRIX and is protected by copyright, trademark, and other intellectual property laws. You may download materials solely for the purpose of procurement evaluations with VAM VALTRIX.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">4. Limitation of Liability</h2>
                <p>
                  While we make every effort to verify our suppliers and material certifications, VAM VALTRIX shall not be held liable for any indirect, incidental, or consequential damages arising from the use of this website, or from discrepancies in third-party technical documentation before a formal purchase order is executed.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">5. Governing Law</h2>
                <p>
                  These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, India.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-bold text-[#2C3E50] mb-3">Contact Legal Team</h2>
                <p>
                  If you have any questions or clarifications regarding these Terms of Use, please reach out to our legal department:
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>Email:</strong> legal@valtrixmaterials.com
                </p>
              </section>
            </Reveal>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
