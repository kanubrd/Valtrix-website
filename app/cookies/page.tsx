'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';

export default function CookiesPage() {
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
              <span className="text-sm font-medium text-[#2C3E50]">Privacy & Compliance</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-4">
              Cookie Policy
            </h1>
            <p className="text-gray-500 text-sm">
              Last Updated: June 20, 2026
            </p>
          </div>

          <div className="prose prose-blue max-w-none text-gray-600 space-y-8 leading-relaxed">
            <Reveal>
              <section className="bg-[#F8FAFB] p-6 rounded-xl border border-gray-100">
                <h2 className="text-xl font-bold text-[#2C3E50] mb-3">About This Cookie Policy</h2>
                <p>
                  This Cookie Policy explains what cookies are, how we use them on our website, the types of cookies we place, and how you can manage your preferences. It complies with privacy frameworks requiring clear consent for cookies and trackers (such as the GDPR and DPDPA).
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">1. What Are Cookies?</h2>
                <p>
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">2. How We Use Cookies</h2>
                <p>
                  We use cookies for a limited set of purposes, primarily focused on site performance, security, and user preferences:
                </p>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full divide-y divide-gray-200 border-2 border-gray-100">
                    <thead className="bg-[#F8FAFB]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C3E50] uppercase tracking-wider">Cookie Category</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C3E50] uppercase tracking-wider">Purpose</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C3E50] uppercase tracking-wider">Storage Time</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 text-sm">
                      <tr>
                        <td className="px-6 py-4 font-bold text-gray-800">Essential (Strictly Necessary)</td>
                        <td className="px-6 py-4">Security, rate limiting (such as API firewalls), and storing cookie consent choice.</td>
                        <td className="px-6 py-4">Up to 1 year</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-gray-800">Preferences</td>
                        <td className="px-6 py-4">Remembers user login sessions (JWT) and persistent frontend configurations.</td>
                        <td className="px-6 py-4">Session or up to 7 days</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-gray-800">Analytics (Optional)</td>
                        <td className="px-6 py-4">Aggregated, anonymous data to analyze page performance and improve navigation. Only loaded if consent is granted.</td>
                        <td className="px-6 py-4">Up to 13 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">3. Cookie Consent Banner</h2>
                <p>
                  Upon your first visit, a cookie consent banner is displayed at the bottom of the page. 
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>If you click **"Accept All"**, we will store your choice and allow optional analytics scripts to run.</li>
                  <li>If you click **"Reject All"**, we will only load strictly necessary cookies, and no optional analytics will run.</li>
                  <li>Your preference is saved locally on your browser in `localStorage` under `cookie-consent` and is respected on all subsequent visits.</li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2C3E50]">4. Managing Cookies in Browser</h2>
                <p>
                  You can also configure your browser to block cookies entirely or notify you when a cookie is being sent. To manage cookies, look under the "Settings" or "Privacy" tab of your browser:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Google Chrome: Settings &gt; Privacy and Security &gt; Third-party cookies</li>
                  <li>Mozilla Firefox: Options &gt; Privacy & Security &gt; Cookies and Site Data</li>
                  <li>Apple Safari: Preferences &gt; Privacy</li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-bold text-[#2C3E50] mb-3">Questions?</h2>
                <p>
                  If you require more details on how we handle user data and trackers, please contact us:
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>Email:</strong> privacy@valtrixmaterials.com
                </p>
              </section>
            </Reveal>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
