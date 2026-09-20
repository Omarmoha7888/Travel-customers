import React, { useState, useEffect } from 'react';
import { Language, CustomerOrder } from '../types';
import { translations } from '../lib/localization';
import { lookupCustomerOrder } from '../lib/api';
import { COMPANY_INFO } from '../lib/data';
import {
  Search,
  ShieldCheck,
  Calendar,
  Phone,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  HelpCircle,
  Download,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';

interface CheckOrderViewProps {
  currentLanguage: Language;
  initialOrderId?: string;
  onNavigateToRequest: () => void;
}

export const CheckOrderView: React.FC<CheckOrderViewProps> = ({
  currentLanguage,
  initialOrderId,
  onNavigateToRequest,
}) => {
  const t = translations[currentLanguage];

  const [orderId, setOrderId] = useState<string>(initialOrderId || '');
  const [identifier, setIdentifier] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderResult, setOrderResult] = useState<CustomerOrder | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  useEffect(() => {
    if (initialOrderId) {
      setOrderId(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    setOrderResult(null);

    if (!orderId.trim()) {
      setErrorNotice('Please enter your Order Reference ID (e.g. BT-000125).');
      return;
    }
    if (!identifier.trim()) {
      setErrorNotice('For security, please enter the Phone Number or Email used when submitting.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await lookupCustomerOrder(orderId.trim(), identifier.trim());
      if (res.success && res.order) {
        setOrderResult(res.order);
      } else {
        setErrorNotice(
          res.message ||
            'No matching order found. Please check your reference ID and phone/email, or contact our support desk.'
        );
      }
    } catch {
      setErrorNotice('Could not connect to the verification service. Please try again shortly.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: CustomerOrder['status']) => {
    switch (status) {
      case 'Confirmed':
      case 'Completed':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-400',
          label: status,
        };
      case 'Processing':
      case 'In Review':
        return {
          bg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
          dot: 'bg-amber-400',
          label: status,
        };
      case 'Expired':
        return {
          bg: 'bg-rose-500/20 border-rose-500/40 text-rose-300',
          dot: 'bg-rose-400',
          label: 'Expired (7 Days Reached)',
        };
      case 'Cancelled':
      case 'Rejected':
        return {
          bg: 'bg-red-500/15 border-red-500/30 text-red-300',
          dot: 'bg-red-400',
          label: status,
        };
      case 'Pending':
      default:
        return {
          bg: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
          dot: 'bg-blue-400',
          label: status,
        };
    }
  };

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
          Tracking & Verification
        </span>
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-white"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {t.check_order_title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
          {t.check_order_subtitle}
        </p>
      </div>

      {/* Search Form Card */}
      <div className="bg-[#141414] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                {t.check_order_input_id} *
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. BT-000125"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white font-mono uppercase focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                {t.check_order_input_contact} *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 612483838 or client@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Quick Demo Hint */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
            <span>
              Try sample reference: <code className="text-[#e5be4a]">BT-000125</code> with phone{' '}
              <code className="text-[#e5be4a]">612483838</code>
            </span>
            <span className="hidden sm:inline">Protected by Customer Privacy Protocol</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg mt-4 disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, #F9D976 0%, #E5BE4A 50%, #B8861B 100%)',
              color: '#080808',
            }}
          >
            {isLoading ? (
              <span>Searching Records...</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{t.check_order_btn}</span>
              </>
            )}
          </button>

          {/* 7-Day Expiration & Recycling Policy Notice */}
          <div className="mt-4 pt-4 border-t border-neutral-800/80 flex items-start sm:items-center gap-3 text-xs text-neutral-400">
            <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="leading-relaxed text-[11px] sm:text-xs">
              <strong className="text-neutral-200">Siyaasadda Dalabyada (7-Day Policy):</strong> Dalab kasta wuxuu shaqeynayaa <span className="text-[#F9D976] font-semibold">7 maalmood</span>. Hadii 7 maalmood kasoo wareegato, Request ID-gu wuu dhacayaa (Expire) waxaana dib loogu isticmaali karaa dalabyo cusub si lambaradu aysan weligood u kala go'in ama u istaagin.
            </p>
          </div>
        </form>
      </div>

      {/* Error / Not Found Message */}
      {errorNotice && (
        <div className="mb-8 p-5 rounded-2xl bg-red-950/30 border border-red-900/50 flex items-start gap-3.5 text-xs text-red-200">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-sm mb-1">Search Notice</span>
            <span>{errorNotice}</span>
          </div>
        </div>
      )}

      {/* Order Status Display (CRITICAL PRIVACY RULE ENFORCED) */}
      {orderResult && (
        <div
          className="rounded-3xl bg-[#141414] border border-[#D4AF37]/50 p-6 sm:p-8 shadow-2xl shadow-black relative overflow-hidden animate-fade-in"
          id="order-details-card"
        >
          {/* Expired Status Notice Banner */}
          {(orderResult.status === 'Expired' || orderResult.isExpired) && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-700/60 flex items-start gap-3.5 text-xs text-rose-200">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <div className="font-bold text-sm text-rose-300 flex items-center justify-between">
                  <span>Codsigan wuxuu dhacay (7-Day Expiration Reached)</span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-rose-900/80 text-rose-200 border border-rose-700">
                    Expired
                  </span>
                </div>
                <p className="leading-relaxed text-rose-200/90 text-xs">
                  Dalabkan waxaa laga joogaa in ka badan <strong>7 maalmood</strong>. Request ID-ga (<strong>{orderResult.id}</strong>) hadda wuu dhacay waxaana dib loo fasaxay oo dib loogu isticmaali karaa dalabyo cusub si lambaradu aysan weligood u istaagin.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={onNavigateToRequest}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Gudbi Dalab Cusub (Submit New Request)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold block">
                Confirmed Reference Number
              </span>
              <h2
                className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4B8] via-[#E5BE4A] to-[#B8861B] mt-0.5"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {orderResult.id}
              </h2>
            </div>

            {/* Status Badge */}
            <div>
              {(() => {
                const badge = getStatusBadge(orderResult.status);
                return (
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider ${badge.bg}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`}></span>
                    <span>Status: {badge.label}</span>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 border-b border-neutral-800 text-xs">
            <div>
              <span className="text-neutral-400 block mb-1">Service Type</span>
              <span className="text-sm font-bold text-white block">{orderResult.serviceName}</span>
            </div>

            <div>
              <span className="text-neutral-400 block mb-1">Client Name</span>
              <span className="text-sm font-semibold text-white block">{orderResult.customerName}</span>
            </div>

            <div>
              <span className="text-neutral-400 block mb-1">Submission Date</span>
              <div className="flex items-center gap-1.5 text-neutral-200">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{orderResult.createdAt}</span>
              </div>
            </div>

            <div>
              <span className="text-neutral-400 block mb-1">Validity & Retention</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span
                  className={
                    orderResult.status === 'Expired' || orderResult.isExpired
                      ? 'text-rose-400 font-bold'
                      : 'text-neutral-200 font-medium'
                  }
                >
                  {orderResult.status === 'Expired' || orderResult.isExpired
                    ? 'Expired (7 Days Exceeded)'
                    : 'Active (7-Day Period)'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-neutral-400 block mb-1">Route / Destination</span>
              <span className="text-neutral-200 font-medium">
                {orderResult.destinationSummary || 'Standard travel assistance'}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 block mb-1">Assigned Contact Line</span>
              <span className="text-neutral-200 font-medium">{orderResult.phone}</span>
            </div>

            <div>
              <span className="text-neutral-400 block mb-1">Official Handling Office</span>
              <span className="text-neutral-200 font-medium">Mogadishu Main Operations</span>
            </div>
          </div>

          {/* Passport Verification Block if present */}
          {(orderResult.documentNumber || orderResult.documentImageData) && (
            <div className="py-6 border-b border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-wider block mb-3 text-[#D4AF37] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Verified Travel Passport Information</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-4">
                <div>
                  <span className="text-neutral-400 block mb-1">Document Type</span>
                  <span className="text-sm font-semibold text-white block">
                    {orderResult.documentType || 'Passport'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-1">Passport Number</span>
                  <span className="text-sm font-bold text-[#F9D976] font-mono block">
                    {orderResult.documentNumber || 'Registered'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-1">Passport Nationality</span>
                  <span className="text-sm font-semibold text-white block">
                    {orderResult.documentNationality || 'Somali'}
                  </span>
                </div>
              </div>

              {orderResult.documentImageData && (
                <div className="p-3 bg-neutral-900 rounded-2xl border border-neutral-800 inline-block max-w-sm">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[11px] text-neutral-400 font-medium">
                      Attached Passport Photo:
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                      Passport Verified
                    </span>
                  </div>
                  <div className="w-56 sm:w-64 h-36 rounded-xl overflow-hidden bg-black border border-neutral-700 relative group">
                    <img
                      src={orderResult.documentImageData}
                      alt="Verified Passport Scan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2.5 flex items-center gap-2">
                    <a
                      href={orderResult.documentImageData}
                      download={orderResult.documentImageName || `Balcad_${orderResult.id}_Document.jpg`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-neutral-950 text-xs font-bold transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Dagsa Sawirka (Download)</span>
                    </a>
                    <a
                      href={`/api/download-document?id=${encodeURIComponent(orderResult.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[#D4AF37] border border-neutral-700 transition-colors"
                      title="Direct File Link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Customer-Facing Notes (Sanitized) */}
          <div className="pt-6">
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2 text-[#D4AF37]">
              Customer Service Note
            </span>
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
              {orderResult.customerNotes ||
                'Your request has been received by our desk. Our flight & visa team will reach out to you directly to confirm travel arrangements.'}
            </div>
          </div>

          {/* Actions for customer */}
          <div className="mt-6 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>Verified Customer Session • Internal records protected</span>
            </div>

            <a
              href={`https://wa.me/${COMPANY_INFO.primaryPhone}?text=${encodeURIComponent(
                `Hello Balcad Travel, I am inquiring about my order reference: ${orderResult.id}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-200 hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-green-400" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Privacy Guarantee Banner */}
      <div className="mt-8 p-6 rounded-2xl bg-[#0f0f0f] border border-neutral-900 text-center">
        <ShieldCheck className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
          Customer Privacy & Data Protection
        </h4>
        <p className="text-[11px] text-neutral-400 mt-1 max-w-lg mx-auto leading-relaxed">
          Order lookups require both the official Reference ID and your verified contact telephone or email. Internal staff notes, supplier fees, and costs remain confidential under company policy.
        </p>
      </div>
    </div>
  );
};
