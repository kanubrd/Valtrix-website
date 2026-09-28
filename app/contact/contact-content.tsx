'use client';

import { useState } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { validateContactForm, sanitiseString, getRecaptchaToken } from '@/lib/validation';

import { trackEvent } from '@/lib/gtag';

export function ContactContent() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status,    setStatus]    = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errorMsg,  setErrorMsg]  = useState('');
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);

  // Honeypot — bots fill this, humans don't
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (honeypot) {
      setStatus('success');
      return;
    }

    const errors = validateContactForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus('loading');

    try {
      const recaptchaToken = await getRecaptchaToken('contact');
      const solutionsText = selectedSolutions.length > 0
        ? `[Solutions Required: ${selectedSolutions.join(', ')}]\n\n`
        : '';

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: sanitiseString(formData.name),
          email: formData.email.trim().toLowerCase(),
          subject: formData.company ? `Inquiry from ${sanitiseString(formData.company)}` : 'General Inquiry',
          message: solutionsText + sanitiseString(formData.message),
          _hp: honeypot, // Honeypot field - bots fill this, humans don't
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      trackEvent({
        action: 'submit_form',
        category: 'Contact',
        label: formData.company ? `Inquiry from ${formData.company}` : 'General Inquiry',
      });
      setFormData({ name: '', email: '', company: '', message: '' });
      setSelectedSolutions([]);
      setFieldErrors({});
    } catch (err) {
      setErrorMsg('Unable to send your message. Please try again or email us directly.');
      setStatus('error');
    }
  };

  return (
    <div className="pt-16 sm:pt-20">
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}`}
        strategy="afterInteractive"
      />

      {/* Hero */}
      <Section className="bg-white py-12 sm:py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#17A2B8]" />
            <span className="text-sm font-medium text-[#2C3E50]">Get In Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-4 sm:mb-6 leading-tight">
            Talk to Someone Who{' '}
            <span className="gradient-text">Knows Materials</span>
          </h1>
          <p className="text-base sm:text-xl text-[#6B7280]">
            Have a sourcing challenge? Send us the details and a VAM VALTRIX specialist will respond — usually within a few hours.
          </p>
        </motion.div>
      </Section>

      {/* Contact Info + Form */}
      <Section className="bg-[#F8FAFB]">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Info */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <SectionTitle subtitle="CONTACT INFO" title="Reach Out" className="text-left mb-2" />
            
            {/* ISO & Location Badge */}
            <div className="bg-[#E6F7FA] border border-[#D1F2F7] p-4 rounded-xl">
              <div className="flex items-center gap-2 text-[#17A2B8] font-bold text-xs uppercase tracking-wider mb-1">
                ISO 9001:2015 Certified • Vadodara, Gujarat
              </div>
              <p className="text-xs text-[#2C3E50] leading-relaxed font-medium">
                Valtrix Advance Material Pvt. Ltd. is located in Vadodara, Gujarat. Official R&amp;D and manufacturing plant serving Gujarat industrial corridors and global markets.
              </p>
            </div>

            {[
              { icon: Mail,   title: 'Email',  lines: ['info@valtrixmaterials.com'] },
              { icon: Phone,  title: 'Phone',  lines: ['+91 98981 23983', 'Mon–Fri, 9am–6pm IST'] },
              { icon: MapPin, title: 'Office & Plant', lines: ['Valtrix Advance Material Pvt. Ltd.', '318, Fortune Gateway, Chhani,', 'Vadodara Industrial Area, Vadodara - 390024, Gujarat, India'] },
            ].map(({ icon: Icon, title, lines }, idx) => (
              <Reveal key={title} direction="left" delay={idx * 0.1}>
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#E6F7FA] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#17A2B8]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2C3E50] mb-1">{title}</h3>
                    {lines.map((l) => <p key={l} className="text-[#6B7280] text-sm break-all">{l}</p>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Form */}
          <Reveal direction="right" className="lg:col-span-2">
            <motion.form
              id="contact-form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-100 shadow-sm"
            >
              {/* Honeypot field */}
              <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#2C3E50] mb-2" htmlFor="contact-name">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange('name')}
                    required
                    maxLength={100}
                    autoComplete="name"
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-4 focus:ring-[#17A2B8]/10 transition-all duration-200 min-h-[48px] ${fieldErrors.name ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}`}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" role="alert" className="text-xs text-red-600 mt-1">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#2C3E50] mb-2" htmlFor="contact-email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange('email')}
                    required
                    maxLength={254}
                    autoComplete="email"
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-4 focus:ring-[#17A2B8]/10 transition-all duration-200 min-h-[48px] ${fieldErrors.email ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}`}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" role="alert" className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Company */}
              <div className="mb-4 sm:mb-5">
                <label className="block text-sm font-semibold text-[#2C3E50] mb-2" htmlFor="contact-company">
                  Company
                </label>
                <input
                  id="contact-company"
                  type="text"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={handleChange('company')}
                  maxLength={100}
                  autoComplete="organization"
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-4 focus:ring-[#17A2B8]/10 transition-all duration-200 min-h-[48px] ${fieldErrors.company ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}`}
                />
                {fieldErrors.company && (
                  <p role="alert" className="text-xs text-red-600 mt-1">{fieldErrors.company}</p>
                )}
              </div>

              {/* Solutions Required Checklist */}
              <div className="mb-4 sm:mb-5">
                <span className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  Solutions Required
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  {['Rust Converter VAM RC 01', 'Polyurethane Building Blocks', 'High Build Coatings', 'VAMShield-90', 'SusCat-I', 'VAM HS-100'].map((solution) => {
                    const isChecked = selectedSolutions.includes(solution);
                    return (
                      <label
                        key={solution}
                        className={`flex items-center gap-3 px-3 py-2.5 bg-white border rounded-lg cursor-pointer transition-all duration-200 group ${isChecked ? 'border-[#17A2B8] ring-2 ring-[#17A2B8]/10' : 'border-gray-200 hover:border-[#17A2B8]'}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedSolutions((prev) =>
                              prev.includes(solution)
                                ? prev.filter((x) => x !== solution)
                                : [...prev, solution]
                            );
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-[#17A2B8] focus:ring-[#17A2B8] cursor-pointer accent-[#17A2B8]"
                        />
                        <span className={`text-sm font-medium transition-colors duration-200 ${isChecked ? 'text-[#17A2B8]' : 'text-[#2C3E50] group-hover:text-[#17A2B8]'}`}>
                          {solution}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="mb-5 sm:mb-6">
                <label className="block text-sm font-semibold text-[#2C3E50] mb-2" htmlFor="contact-message">
                  What are you sourcing? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Describe the material, spec, quantity, and timeline..."
                  value={formData.message}
                  onChange={handleChange('message')}
                  required
                  rows={5}
                  maxLength={5000}
                  aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-4 focus:ring-[#17A2B8]/10 resize-none transition-all duration-200 ${fieldErrors.message ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}`}
                />
                {fieldErrors.message && (
                  <p id="message-error" role="alert" className="text-xs text-red-600 mt-1">{fieldErrors.message}</p>
                )}
              </div>

              {/* B2B Trust Signals inside Form */}
              <div className="grid grid-cols-3 gap-2 py-3 px-2 rounded-xl bg-gray-50 border border-gray-100 mb-5 text-center">
                <div className="text-[11px] font-semibold text-[#4A5568] flex items-center justify-center gap-1.5">
                  <Clock size={14} className="text-[#17A2B8] shrink-0" />
                  <span>&lt;2h Response</span>
                </div>
                <div className="text-[11px] font-semibold text-[#4A5568] flex items-center justify-center gap-1.5 border-x border-gray-200">
                  <ShieldCheck size={14} className="text-[#17A2B8] shrink-0" />
                  <span>NDA Protected</span>
                </div>
                <div className="text-[11px] font-semibold text-[#4A5568] flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#17A2B8] shrink-0" />
                  <span>Chemist Verified</span>
                </div>
              </div>

              {status === 'success' ? (
                <div className="text-center py-4 bg-[#E6F7FA] rounded-xl border border-[#D1F2F7]">
                  <p className="font-semibold text-[#17A2B8]">✓ Message received — we&apos;ll be in touch within a few hours.</p>
                </div>
              ) : (
                <>
                  <motion.button
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={status === 'loading'}
                    aria-busy={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#17A2B8] hover:bg-[#0D7A8C] disabled:opacity-60 text-white rounded-xl font-bold transition-all duration-300 min-h-[52px] shadow-sm hover:shadow text-base"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Request...
                      </span>
                    ) : (
                      <>
                        <span>Request a Quote Now</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </motion.button>
                  {status === 'error' && (
                    <p role="alert" className="text-center text-sm text-red-600 mt-3">{errorMsg}</p>
                  )}
                </>
              )}

              <p className="text-xs text-gray-400 text-center mt-4">
                Protected by reCAPTCHA.{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#17A2B8]">Privacy</a>
                {' & '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#17A2B8]">Terms</a>
                {' apply.'}
              </p>
            </motion.form>
          </Reveal>
        </div>
      </Section>

      {/* GEO Google Maps Location & Plant Tour Section */}
      <Section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <SectionTitle 
              subtitle="VISIT OUR PLANT" 
              title="Vadodara, Gujarat Manufacturing Facility" 
              description="Locate Valtrix Advance Material Pvt. Ltd. in Vadodara Industrial Area for direct chemical audits and plant consultations."
              className="text-left mb-0"
            />
            <a
              href="https://maps.google.com/?q=22.3486,73.1812"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#17A2B8] text-white font-semibold text-sm hover:bg-[#138496] transition-colors shadow-md hover:shadow-lg shrink-0 self-start md:self-auto"
            >
              <MapPin size={16} />
              Open in Google Maps
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative w-full h-[380px] sm:h-[460px] bg-[#EBF2F7]">
            <iframe
              title="Valtrix Advance Material Pvt. Ltd. Vadodara Gujarat office location map"
              src="https://www.google.com/maps?q=22.3486,73.1812+(Valtrix+Advance+Material+Pvt+Ltd)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 bg-gray-50 px-5 py-3.5 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-[#17A2B8] shrink-0" />
              <span className="font-medium text-gray-800">Address:</span>
              <span>318, Fortune Gateway, Chhani, Vadodara - 390024, Gujarat, India</span>
            </div>
            <a
              href="https://maps.google.com/?q=22.3486,73.1812"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#17A2B8] hover:underline font-semibold flex items-center gap-1 shrink-0"
            >
              Get Turn-by-Turn Directions &rarr;
            </a>
          </div>
        </div>
      </Section>

      {/* Customer Reviews & Google Business Profile Section */}
      <section id="reviews" className="bg-[#F8FAFB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold text-[#17A2B8] uppercase tracking-wider mb-2 bg-[#E6F7FA] border border-[#D1F2F7] px-3.5 py-1.5 rounded-full">
              GOOGLE BUSINESS PROFILE REVIEWS
            </span>
            <h2 className="text-3xl font-extrabold text-[#2C3E50]">Customer Reviews</h2>
            <div className="flex items-center justify-center gap-1 mt-2 text-amber-400">
              {'★'.repeat(5)}
              <span className="text-sm font-bold text-gray-700 ml-2">5.0 / 5.0 Rating (Verified Client Reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-amber-400 text-sm mb-3">★★★★★</div>
                <p className="text-gray-700 text-base leading-relaxed mb-4 italic font-medium">
                  &ldquo;Valtrix additives helped us reduce downtime significantly.&rdquo;
                </p>
              </div>
              <div>
                <div className="font-bold text-[#2C3E50] text-sm">&ndash; Automotive OEM</div>
                <div className="text-xs text-gray-500">Vadodara Industrial Corridor</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-amber-400 text-sm mb-3">★★★★★</div>
                <p className="text-gray-700 text-base leading-relaxed mb-4 italic font-medium">
                  &ldquo;ISO-certified coatings that truly protect our equipment.&rdquo;
                </p>
              </div>
              <div>
                <div className="font-bold text-[#2C3E50] text-sm">&ndash; Industrial Client</div>
                <div className="text-xs text-gray-500">Gujarat Manufacturing Hub</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-amber-400 text-sm mb-3">★★★★★</div>
                <p className="text-gray-700 text-base leading-relaxed mb-4 italic font-medium">
                  &ldquo;Reliable partner in Vadodara for advanced chemical solutions.&rdquo;
                </p>
              </div>
              <div>
                <div className="font-bold text-[#2C3E50] text-sm">&ndash; Local Manufacturer</div>
                <div className="text-xs text-gray-500">General Industrial Manufacturing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Section className="bg-white">
        <SectionTitle subtitle="FREQUENTLY ASKED" title="Common Questions" />
        <div className="mt-8 sm:mt-12 max-w-3xl mx-auto space-y-3">
          {[
            { q: "Is Valtriks the same as Valtrix Advance Material Pvt. Ltd.?", a: "Yes, Valtriks is a common alternative spelling and typo for Valtrix Advance Material Pvt. Ltd., an ISO 9001:2015 certified manufacturer of industrial additives, corrosion inhibitors, and chemical coatings based in Vadodara, Gujarat." },
            { q: "What is Valtrixx company?", a: "Valtrixx refers to Valtrix Advance Material Pvt. Ltd., delivering advanced industrial additives, corrosion-resistant coatings, and custom chemical formulations to reduce downtime, prevent sludge, and extend equipment life." },
            { q: "Does Waltrix provide industrial additives?", a: "Yes, Waltrix (officially Valtrix Advance Material Pvt. Ltd.) provides high-performance industrial additives, Rust Converter VAM RC 01, Polyurethane Building Blocks, and High Build Coatings from its Vadodara plant." },
            { q: "Are Baltrix and Valtrics official names of Valtrix Advance Material Pvt. Ltd.?", a: "Baltrix and Valtrics are common phonetic variations and search terms for Valtrix Advance Material Pvt. Ltd., serving Vadodara, Gujarat and global manufacturing markets." },
            { q: "How quickly can Valtrix Advance Material Pvt. Ltd. source a material?", a: "For most specialty materials, we can identify and qualify a new formulation within 24–72 hours through our Vadodara R&D facility." },
            { q: 'What certifications come standard with Valtrix orders?', a: 'Every order includes relevant mill certificates, material test reports, ISO 9001:2015 quality verification, and compliance documentation (REACH, RoHS).' },
          ].map((faq, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <details className="group border-2 border-gray-100 hover:border-[#D1F2F7] rounded-xl p-4 sm:p-6 transition-colors cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-[#2C3E50] list-none text-sm sm:text-base">
                  {faq.q}
                  <span className="ml-4 w-6 h-6 rounded-full bg-[#E6F7FA] flex items-center justify-center text-[#17A2B8] text-xs shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 sm:mt-4 text-[#6B7280] text-sm leading-relaxed">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#2C3E50] text-white text-center py-12 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">Start Your First Sourcing Request</h2>
        <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Tell us what you need. A VAM VALTRIX sourcing specialist will follow up with options, pricing, and lead times — usually within the same business day.
        </p>
        <a
          href="#contact-form"
          onClick={(e) => { 
            e.preventDefault(); 
            document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
          }}
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-[#17A2B8] text-white font-semibold hover:bg-[#0D7A8C] transition-colors min-h-[48px]"
        >
          Contact Us →
        </a>
      </Section>
    </div>
  );
}
