'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { ShieldCheck, Award, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ComplianceContent() {
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
              <span className="text-sm font-bold text-[#2C3E50]">Standards, Quality & Certifications</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-4">
              Material Compliance &amp; Certifications
            </h1>
            <p className="text-gray-500 text-sm">
              ISO 9001:2024 Certified • Vadodara, Gujarat Plant
            </p>
          </div>

          <div className="prose prose-blue max-w-none text-gray-600 space-y-8 leading-relaxed">
            <Reveal>
              <section className="bg-[#F8FAFB] p-6 rounded-xl border border-gray-100 flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-[#E6F7FA] flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-[#17A2B8] w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#2C3E50] mb-2">Our Quality Policy &amp; ISO 9001:2024</h2>
                  <p>
                    Valtrix Advance Material Pvt. Ltd. is dedicated to serving high-precision manufacturing industries (including automotive, aerospace, defense, and heavy machining) with materials that adhere to strict global chemical regulations and ISO 9001:2024 quality management systems. Every shipment comes standard with verified Certificate of Analysis (CoA) and mill test reports.
                  </p>
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-[#17A2B8] w-6 h-6" />
                  <h2 className="text-2xl font-bold text-[#2C3E50]">REACH Regulation (EC 1907/2006)</h2>
                </div>
                <p>
                  <strong>REACH</strong> (Registration, Evaluation, Authorisation and Restriction of Chemicals) is a European Union regulation addressing the production and use of chemical substances, and their potential impacts on human health and the environment.
                </p>
                <p>
                  At Valtrix, we audit our synthesis routes to ensure that our specialty polymers, lubricant additives, and metal treatments do not contain Substances of Very High Concern (SVHC) above the threshold limit of 0.1% weight by weight (w/w). REACH declaration certificates are provided on demand for every batch.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-[#17A2B8] w-6 h-6" />
                  <h2 className="text-2xl font-bold text-[#2C3E50]">RoHS Compliance (Directive 2011/65/EU &amp; 2015/863)</h2>
                </div>
                <p>
                  <strong>RoHS</strong> (Restriction of Hazardous Substances) restricts hazardous materials (such as Lead, Mercury, Cadmium, and Hexavalent Chromium) in electrical and industrial equipment.
                </p>
                <p>
                  We formulate non-chromate surface conversion coatings and ashless anti-wear additives that comply strictly with RoHS 3 Directive requirements.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-[#17A2B8] w-6 h-6" />
                  <h2 className="text-2xl font-bold text-[#2C3E50]">ASTM Testing Standards</h2>
                </div>
                <p>
                  Our formulations undergo standardized tribological and corrosion testing under ASTM methodologies, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-[#4A5568]">
                  <li><strong>ASTM D2783:</strong> Measurement of Extreme-Pressure Properties of Lubricating Fluids (4-Ball Method).</li>
                  <li><strong>ASTM B117:</strong> Standard Practice for Operating Salt Spray (Fog) Apparatus (&gt;1,000 hrs corrosion resistance).</li>
                  <li><strong>ASTM D4172:</strong> Wear Preventive Characteristics of Lubricating Fluid (4-Ball Method).</li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="text-[#17A2B8] w-6 h-6" />
                  <h2 className="text-xl font-bold text-[#2C3E50]">Request Compliance Certificates &amp; TDS/SDS</h2>
                </div>
                <p className="text-sm">
                  To request compliance declarations (ISO, REACH, RoHS, CoA) or safety datasheets for specific material batches, contact our quality assurance desk in Vadodara:
                </p>
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    <p><strong>Direct Desk:</strong> info@valtrixmaterials.com</p>
                    <p><strong>Phone:</strong> +91 98981 23983</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17A2B8] text-white font-semibold text-sm hover:bg-[#0D7A8C] transition-colors"
                  >
                    <span>Request Documentation</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </section>
            </Reveal>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
