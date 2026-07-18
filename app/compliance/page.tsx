'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { ShieldCheck, Award, FileText } from 'lucide-react';

export default function CompliancePage() {
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
              <span className="text-sm font-medium text-[#2C3E50]">Standards & Quality</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-4">
              Material Compliance
            </h1>
            <p className="text-gray-500 text-sm">
              Last Updated: June 20, 2026
            </p>
          </div>

          <div className="prose prose-blue max-w-none text-gray-600 space-y-8 leading-relaxed">
            <Reveal>
              <section className="bg-[#F8FAFB] p-6 rounded-xl border border-gray-100 flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-[#E6F7FA] flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-[#17A2B8] w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#2C3E50] mb-2">Our Quality Policy</h2>
                  <p>
                    VAM VALTRIX is dedicated to serving high-precision manufacturing industries (including aerospace, defense, and automotive) with materials that adhere to strict global chemical regulations and sourcing guidelines. Every shipment comes standard with verified manufacturer test reports and mill certificates.
                  </p>
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-[#17A2B8] w-6 h-6" />
                  <h2 className="text-2xl font-bold text-[#2C3E50]">REACH Regulation</h2>
                </div>
                <p>
                  **REACH** (Registration, Evaluation, Authorisation and Restriction of Chemicals) is a European Union regulation addressing the production and use of chemical substances, and their potential impacts on both human health and the environment.
                </p>
                <p>
                  At VAM VALTRIX, we audit our supply chain networks to ensure that the composite polymers, specialty coatings, and metal treatments we distribute do not contain Substances of Very High Concern (SVHC) above the threshold limit of 0.1% weight by weight (w/w). REACH declaration certificates are available on demand for all eligible product runs.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-[#17A2B8] w-6 h-6" />
                  <h2 className="text-2xl font-bold text-[#2C3E50]">RoHS Compliance</h2>
                </div>
                <p>
                  **RoHS** (Restriction of Hazardous Substances) restricts the use of specific hazardous materials (such as Lead, Mercury, Cadmium, and Hexavalent chromium) in electrical and electronic equipment.
                </p>
                <p>
                  We guarantee that our raw materials supplied for consumer electronics and industrial machinery component manufacture comply with the RoHS 3 Directive (2015/863/EU). Our material specification sheets clearly declare RoHS compliance status so you can proceed to manufacturing with total peace of mind.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-[#17A2B8] w-6 h-6" />
                  <h2 className="text-2xl font-bold text-[#2C3E50]">DFARS Compliance</h2>
                </div>
                <p>
                  For our defense and aerospace clients, we supply materials compliant with the **Defense Federal Acquisition Regulation Supplement (DFARS)** clause 252.225-7014 (Preference for Domestic Specialty Metals).
                </p>
                <p>
                  We source specialty alloys, titanium, and steel from qualifying countries outlined by the US Department of Defense (DoD). Original mill certification records listing the country of melt are archived and provided with every delivery to verify DFARS compliance.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="text-[#17A2B8] w-6 h-6" />
                  <h2 className="text-xl font-bold text-[#2C3E50]">Request Compliance Certificates</h2>
                </div>
                <p>
                  To request compliance declarations (REACH, RoHS, DFARS, or conflict minerals reports) for specific material batches or quotes, please contact our quality department:
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>Email:</strong> info@valtrixmaterials.com
                </p>
              </section>
            </Reveal>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
