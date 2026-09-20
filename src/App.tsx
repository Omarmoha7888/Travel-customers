import React, { useState, useEffect } from 'react';
import { ViewRoute, Language, CustomerOrder, DestinationItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RequestConfirmationModal } from './components/RequestConfirmationModal';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { FlightTicketsView } from './views/FlightTicketsView';
import { VisaServicesView } from './views/VisaServicesView';
import { HotelBookingView } from './views/HotelBookingView';
import { UmrahHajjView } from './views/UmrahHajjView';
import { TourPackagesView } from './views/TourPackagesView';
import { DestinationsView } from './views/DestinationsView';
import { UniversalRequestView } from './views/UniversalRequestView';
import { CheckOrderView } from './views/CheckOrderView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';
import { COMPANY_INFO } from './lib/data';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<ViewRoute>('home');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Parameters passed between views
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [prefilledDetails, setPrefilledDetails] = useState<string | undefined>(undefined);
  const [trackingOrderId, setTrackingOrderId] = useState<string | undefined>(undefined);

  // Active confirmation modal
  const [confirmationOrder, setConfirmationOrder] = useState<CustomerOrder | null>(null);

  // Back to top indicator
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Parse URL query parameters to support direct navigation from email notifications
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const routeParam = params.get('route');
      const orderIdParam = params.get('orderId');

      if (orderIdParam) {
        setTrackingOrderId(orderIdParam.trim().toUpperCase());
      }

      if (routeParam === 'check-order' || orderIdParam) {
        setCurrentRoute('check-order');
      } else if (routeParam && ['home', 'flights', 'services', 'hajj-umrah', 'request', 'faq', 'contact'].includes(routeParam)) {
        setCurrentRoute(routeParam as ViewRoute);
      }
    }
  }, []);

  useEffect(() => {
    // Handle RTL for Arabic
    if (currentLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (route: ViewRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When a service card is clicked on Homepage / Services page
  const handleSelectService = (serviceId: string) => {
    // Direct to dedicated view if available, or universal request
    if (serviceId === 'flight') {
      handleNavigate('flight-tickets');
    } else if (serviceId === 'visa') {
      handleNavigate('visa-services');
    } else if (serviceId === 'hotel') {
      handleNavigate('hotel-booking');
    } else if (serviceId === 'umrah-hajj') {
      handleNavigate('umrah-hajj');
    } else if (serviceId === 'tour') {
      handleNavigate('tour-packages');
    } else {
      setSelectedServiceId(serviceId);
      setPrefilledDetails(`Interested in: ${serviceId}`);
      handleNavigate('request-service');
    }
  };

  // When a destination card is clicked
  const handleSelectDestination = (dest: DestinationItem) => {
    setSelectedServiceId('flight');
    setPrefilledDetails(`Inquiry for destination: ${dest.nameKey} (${dest.countryKey}). Planning a trip to explore.`);
    handleNavigate('request-service');
  };

  // When a tour package is selected
  const handleSelectTourPackage = (pkgTitle: string) => {
    setSelectedServiceId('tour');
    setPrefilledDetails(`Requesting detailed itinerary and quote for: ${pkgTitle}`);
    handleNavigate('request-service');
  };

  // When a customer successfully submits any service request form
  const handleRequestSubmitted = (order: CustomerOrder) => {
    setConfirmationOrder(order);
  };

  // Track order directly from confirmation modal
  const handleTrackOrderFromModal = (orderId: string) => {
    setConfirmationOrder(null);
    setTrackingOrderId(orderId);
    handleNavigate('check-order');
  };

  return (
    <div
      className={`min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col selection:bg-[#d4af37]/30 selection:text-[#f3c64f] ${
        currentLanguage === 'ar' ? 'font-tajawal' : 'font-sans'
      }`}
    >
      {/* Sticky Header */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Main Content Body */}
      <main className="flex-1 w-full" id="main-content">
        {currentRoute === 'home' && (
          <HomeView
            currentLanguage={currentLanguage}
            onNavigate={handleNavigate}
            onSelectService={handleSelectService}
            onSelectDestination={handleSelectDestination}
          />
        )}

        {currentRoute === 'about' && (
          <AboutView
            currentLanguage={currentLanguage}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'services' && (
          <ServicesView
            currentLanguage={currentLanguage}
            onNavigate={handleNavigate}
            onSelectService={handleSelectService}
          />
        )}

        {currentRoute === 'flight-tickets' && (
          <FlightTicketsView
            currentLanguage={currentLanguage}
            onRequestSubmitted={handleRequestSubmitted}
          />
        )}

        {currentRoute === 'visa-services' && (
          <VisaServicesView
            currentLanguage={currentLanguage}
            onRequestSubmitted={handleRequestSubmitted}
          />
        )}

        {currentRoute === 'hotel-booking' && (
          <HotelBookingView
            currentLanguage={currentLanguage}
            onRequestSubmitted={handleRequestSubmitted}
          />
        )}

        {currentRoute === 'umrah-hajj' && (
          <UmrahHajjView
            currentLanguage={currentLanguage}
            onRequestSubmitted={handleRequestSubmitted}
          />
        )}

        {currentRoute === 'tour-packages' && (
          <TourPackagesView
            currentLanguage={currentLanguage}
            onSelectPackage={handleSelectTourPackage}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'destinations' && (
          <DestinationsView
            currentLanguage={currentLanguage}
            onSelectDestination={handleSelectDestination}
          />
        )}

        {currentRoute === 'request-service' && (
          <UniversalRequestView
            currentLanguage={currentLanguage}
            initialServiceId={selectedServiceId}
            initialDetails={prefilledDetails}
            onRequestSubmitted={handleRequestSubmitted}
          />
        )}

        {currentRoute === 'check-order' && (
          <CheckOrderView
            currentLanguage={currentLanguage}
            initialOrderId={trackingOrderId}
            onNavigateToRequest={() => handleNavigate('request-service')}
          />
        )}

        {currentRoute === 'faq' && (
          <FaqView
            currentLanguage={currentLanguage}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactView
            currentLanguage={currentLanguage}
            onRequestSubmitted={handleRequestSubmitted}
          />
        )}
      </main>

      {/* Confirmation Modal */}
      {confirmationOrder && (
        <RequestConfirmationModal
          order={confirmationOrder}
          onClose={() => setConfirmationOrder(null)}
          onTrackOrder={handleTrackOrderFromModal}
        />
      )}

      {/* Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onNavigate={handleNavigate}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Floating Customer Mobile Action Buttons */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3">
        {/* Scroll To Top Button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-neutral-900/90 border border-neutral-700 text-neutral-300 hover:text-white hover:border-[#D4AF37] flex items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* WhatsApp Direct Floating Bubble */}
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/50 transition-all cursor-pointer"
          aria-label="Direct WhatsApp Consultation"
          id="floating-whatsapp-btn"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span className="text-xs font-bold hidden sm:inline group-hover:inline">
            WhatsApp Us
          </span>
        </a>

        {/* Direct Call Floating Button for Mobile */}
        <a
          href="tel:612483838"
          className="sm:hidden w-11 h-11 rounded-full bg-gradient-to-tr from-[#B8861B] to-[#F9D976] text-black flex items-center justify-center shadow-xl shadow-amber-950/60"
          aria-label="Direct Call"
          id="floating-phone-btn"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
