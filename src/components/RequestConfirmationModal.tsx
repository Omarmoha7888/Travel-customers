import React, { useState } from 'react';
import { CustomerOrder } from '../types';
import { COMPANY_INFO } from '../lib/data';
import {
  CheckCircle2,
  Copy,
  Check,
  Search,
  MessageCircle,
  X,
  Mail,
  Phone,
  Clock,
} from 'lucide-react';

interface ModalProps {
  order: CustomerOrder;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const RequestConfirmationModal: React.FC<ModalProps> = ({
  order,
  onClose,
  onTrackOrder,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Balcad Travel Agency, I have submitted a service request.\nReference ID: ${order.id}\nService: ${order.serviceName}\nName: ${order.customerName}`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      id="request-confirmation-modal"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-[#141414] border border-[#D4AF37]/50 p-6 sm:p-8 shadow-2xl shadow-black overflow-hidden text-center">
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient background gold glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/10 blur-[80px] pointer-events-none"></div>

        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#B8861B] via-[#E5BE4A] to-[#FFF2A3] p-[2px] shadow-lg shadow-amber-950/40">
          <div className="w-full h-full rounded-full bg-[#111111] flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-[#F3C64F]" />
          </div>
        </div>

        <h3
          className="text-2xl font-bold text-white mt-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Your Request Has Been Submitted
        </h3>

        <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
          Thank you, <span className="text-white font-semibold">{order.customerName}</span>.
          Your request has been registered and dispatched to our agency desk.
        </p>

        {/* Reference Box */}
        <div className="my-6 p-4 rounded-2xl bg-[#0b0b0b] border border-[#D4AF37]/40 flex flex-col items-center justify-center">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
            Your Official Request Reference
          </span>
          <div className="flex items-center gap-3 mt-1.5">
            <span
              className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2A3] via-[#E5BE4A] to-[#D4AF37] tracking-wider"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {order.id}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
              title="Copy Reference ID"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          {copied && (
            <span className="text-[10px] text-green-400 mt-1 font-medium">
              Reference copied to clipboard!
            </span>
          )}

          {/* 7-Day Validity Badge */}
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80 w-full flex items-center justify-center gap-1.5 text-[11px] text-[#F9D976]">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Muddada: <strong>7 Maalmood</strong> (kadib wuu dhacayaa dib baana loo isticmaalayaa)</span>
          </div>
        </div>

        {/* Dispatch Notification Details */}
        <div className="text-left bg-neutral-900/60 border border-neutral-800 rounded-xl p-3.5 text-xs space-y-2 mb-6 text-neutral-300">
          <div className="flex items-center gap-2 text-amber-300 font-medium">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Automatic notification routed to: balcadtravel@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>
              Our team will call or WhatsApp you at <strong className="text-white">{order.phone}</strong>.
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/80">
            <strong>Service:</strong> {order.serviceName} • <strong>Summary:</strong> {order.destinationSummary || 'Standard travel assistance'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onTrackOrder(order.id)}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
            style={{
              background: 'linear-gradient(135deg, #F9D976 0%, #E5BE4A 50%, #B8861B 100%)',
              color: '#0A0A0A',
            }}
          >
            <Search className="w-4 h-4" />
            <span>Track Order Status</span>
          </button>

          <a
            href={`https://wa.me/${COMPANY_INFO.primaryPhone}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span>Direct WhatsApp</span>
          </a>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          Return to Browsing
        </button>
      </div>
    </div>
  );
};
