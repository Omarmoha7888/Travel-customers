import React, { useState } from 'react';
import { Language, CustomerOrder } from '../types';
import { translations } from '../lib/localization';
import { COMPANY_INFO } from '../lib/data';
import { submitCustomerServiceRequest } from '../lib/api';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface ContactViewProps {
  currentLanguage: Language;
  onRequestSubmitted: (order: CustomerOrder) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  currentLanguage,
  onRequestSubmitted,
}) => {
  const t = translations[currentLanguage];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!fullName || !phone || !message) {
      setFeedback('Please fill in your name, phone number, and message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitCustomerServiceRequest({
        serviceType: 'contact',
        serviceName: subject || 'General Contact Inquiry',
        customerName: fullName,
        phone,
        email,
        details: {
          subject: subject || 'General Inquiry',
          message,
        },
      });

      if (res.success) {
        onRequestSubmitted(res.order);
      }
    } catch {
      setFeedback('Unable to dispatch message right now. Please call our direct line.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
          Customer Care & Help Desk
        </span>
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {t.contact_title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
          {t.contact_subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Col: Contact Channels & Direct CTAs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141414] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3
              className="text-xl font-bold text-white mb-6 text-[#D4AF37]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Direct Travel Agency Lines
            </h3>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block font-medium">Telephone Lines</span>
                  <div className="flex flex-col gap-1 mt-1">
                    <a
                      href="tel:612483838"
                      className="text-base font-bold text-white hover:text-[#e5be4a] transition-colors"
                    >
                      612483838
                    </a>
                    <a
                      href="tel:612141414"
                      className="text-base font-bold text-white hover:text-[#e5be4a] transition-colors"
                    >
                      612141414
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block font-medium">Email Inquiries</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-sm font-semibold text-white hover:text-[#e5be4a] transition-colors break-all mt-1 block"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <span className="text-[11px] text-neutral-500">
                    Dispatched directly to ticketing officers
                  </span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block font-medium">Operating Schedule</span>
                  <span className="text-sm font-semibold text-white mt-1 block">
                    {COMPANY_INFO.hours}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Online inquiries monitored 7 days a week
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block font-medium">Head Office Location</span>
                  <span className="text-sm font-semibold text-white mt-1 block">
                    {COMPANY_INFO.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 pt-6 border-t border-neutral-800 space-y-3">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:612483838"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call Main Line 612483838</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Col: Contact Form */}
        <div className="lg:col-span-7 bg-[#141414] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="border-b border-neutral-800 pb-5 mb-6">
            <h2
              className="text-xl sm:text-2xl font-bold text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Send Us a Message
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Have a travel question or require customized assistance? Fill out the form below and our staff will respond promptly.
            </p>
          </div>

          {feedback && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200">
              {feedback}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmed Yusuf"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 612483838"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. client@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flight inquiry to Istanbul"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Your Message *
              </label>
              <textarea
                rows={5}
                required
                placeholder="How can Balcad Travel Agency assist you today?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #F9D976 0%, #E5BE4A 50%, #B8861B 100%)',
                color: '#080808',
              }}
            >
              {isSubmitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message to Balcad Travel</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
