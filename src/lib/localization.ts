import { Language } from '../types';

export interface Translations {
  // Navigation
  nav_home: string;
  nav_about: string;
  nav_services: string;
  nav_destinations: string;
  nav_faq: string;
  nav_contact: string;
  nav_request_service: string;
  nav_check_order: string;

  // Hero
  hero_eyebrow: string;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  hero_cta_request: string;
  hero_cta_explore: string;
  hero_slogan: string;

  // Trust badges
  badge_support_title: string;
  badge_support_desc: string;
  badge_visa_title: string;
  badge_visa_desc: string;
  badge_flights_title: string;
  badge_flights_desc: string;
  badge_spiritual_title: string;
  badge_spiritual_desc: string;

  // Services section
  services_eyebrow: string;
  services_heading: string;
  services_view_all: string;
  service_request_btn: string;

  // Service titles & descriptions
  service_flight_title: string;
  service_flight_desc: string;
  service_visa_title: string;
  service_visa_desc: string;
  service_hotel_title: string;
  service_hotel_desc: string;
  service_umrah_title: string;
  service_umrah_desc: string;
  service_tour_title: string;
  service_tour_desc: string;
  service_transfer_title: string;
  service_transfer_desc: string;
  service_doc_title: string;
  service_doc_desc: string;
  service_intl_title: string;
  service_intl_desc: string;
  service_regional_title: string;
  service_regional_desc: string;
  service_other_title: string;
  service_other_desc: string;

  // Destinations section
  destinations_eyebrow: string;
  destinations_heading: string;
  destinations_subtitle: string;
  destinations_view_all: string;
  destinations_explore_btn: string;

  // Destination names & tags
  dest_dubai_country: string;
  dest_dubai_desc: string;
  dest_istanbul_country: string;
  dest_istanbul_desc: string;
  dest_makkah_country: string;
  dest_makkah_desc: string;
  dest_maldives_country: string;
  dest_maldives_desc: string;
  dest_malaysia_country: string;
  dest_malaysia_desc: string;
  dest_qatar_country: string;
  dest_qatar_desc: string;

  // Forms common
  form_full_name: string;
  form_phone: string;
  form_email: string;
  form_destination: string;
  form_travel_date: string;
  form_return_date: string;
  form_departure_date: string;
  form_passengers: string;
  form_travel_class: string;
  form_additional_req: string;
  form_submit_request: string;
  form_submitting: string;
  form_required_note: string;
  form_privacy_assurance: string;

  // Order tracking
  track_title: string;
  track_subtitle: string;
  track_order_id: string;
  track_order_id_placeholder: string;
  track_verify_field: string;
  track_verify_placeholder: string;
  track_search_btn: string;
  track_searching: string;
  track_result_heading: string;
  track_status_label: string;
  track_service_label: string;
  track_customer_label: string;
  track_created_label: string;
  track_updated_label: string;
  track_summary_label: string;
  track_security_notice: string;
  track_not_found: string;

  // About & Contact
  about_heading: string;
  about_tagline: string;
  about_mission_title: string;
  about_mission_desc: string;
  about_values_title: string;
  about_values_desc: string;
  contact_heading: string;
  contact_title: string;
  contact_subtitle: string;
  contact_phone_title: string;
  contact_email_title: string;
  contact_call_now: string;
  contact_send_email: string;
  contact_whatsapp: string;

  // Additional aliases for consistency
  check_order_title: string;
  check_order_subtitle: string;
  check_order_input_id: string;
  check_order_input_contact: string;
  check_order_btn: string;
  faq_title: string;
  faq_subtitle: string;
  request_service_title: string;
  request_service_subtitle: string;

  // Footer
  footer_tagline: string;
  footer_quick_links: string;
  footer_services_links: string;
  footer_contact_info: string;
  footer_rights: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_services: 'Services',
    nav_destinations: 'Destinations',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',
    nav_request_service: 'Request a Service',
    nav_check_order: 'Check My Order',

    hero_eyebrow: 'BALCAD TRAVEL AGENCY',
    hero_title_line1: 'Your Journey.',
    hero_title_line2: 'Our Support.',
    hero_subtitle: 'Request flights, visas, hotels, tours and other travel services from Balcad Travel Agency.',
    hero_cta_request: 'Request a Service',
    hero_cta_explore: 'Explore Services',
    hero_slogan: 'Travel More, Worry Less',

    badge_support_title: 'Personalized Support',
    badge_support_desc: 'Direct consultation from experienced travel coordinators.',
    badge_visa_title: 'Visa Assistance',
    badge_visa_desc: 'Professional document review and application support.',
    badge_flights_title: 'Global Flight Booking',
    badge_flights_desc: 'Competitive routes with major international airlines.',
    badge_spiritual_title: 'Umrah & Hajj Services',
    badge_spiritual_desc: 'Dedicated assistance for holy journeys to Makkah & Madinah.',

    services_eyebrow: 'OUR SERVICES',
    services_heading: 'Travel Services Made Simple',
    services_view_all: 'View All Services',
    service_request_btn: 'Request Service',

    service_flight_title: 'Flight Tickets',
    service_flight_desc: 'Book your international and domestic flights with dedicated assistance.',
    service_visa_title: 'Visa Services',
    service_visa_desc: 'Get your visa with professional support and step-by-step guidance.',
    service_hotel_title: 'Hotel Booking',
    service_hotel_desc: 'Find the best hotels and resorts at your destination comfortably.',
    service_umrah_title: 'Umrah & Hajj',
    service_umrah_desc: 'Spiritual journeys with complete travel, visa and accommodation assistance.',
    service_tour_title: 'Tour Packages',
    service_tour_desc: 'Explore amazing destinations around the world tailored to your group.',
    service_transfer_title: 'Airport Transfer',
    service_transfer_desc: 'Safe, punctual and comfortable transportation to and from the airport.',
    service_doc_title: 'Travel Documentation',
    service_doc_desc: 'Get professional help with your travel permits, translations and paperwork.',
    service_intl_title: 'International Travel',
    service_intl_desc: 'Global itineraries, multi-country journeys, and world-class service.',
    service_regional_title: 'Local & Regional Travel',
    service_regional_desc: 'Discover beautiful regional destinations and convenient travel routes.',
    service_other_title: 'Other Travel Services',
    service_other_desc: 'Customized travel arrangements curated for your unique requirements.',

    destinations_eyebrow: 'POPULAR DESTINATIONS',
    destinations_heading: 'Discover Amazing Places',
    destinations_subtitle: 'Explore the world with our curated travel destinations.',
    destinations_view_all: 'View All Destinations',
    destinations_explore_btn: 'Explore / Request',

    dest_dubai_country: 'United Arab Emirates',
    dest_dubai_desc: 'Modern luxury, world-famous architecture, and premier international transit.',
    dest_istanbul_country: 'Turkey',
    dest_istanbul_desc: 'Historic crossroad of East and West, cultural landmarks and vibrant markets.',
    dest_makkah_country: 'Saudi Arabia',
    dest_makkah_desc: 'Spiritual sanctuary for Umrah & Hajj pilgrims from across the globe.',
    dest_maldives_country: 'Indian Ocean',
    dest_maldives_desc: 'Breathtaking overwater villas, crystal lagoons, and peaceful retreats.',
    dest_malaysia_country: 'Kuala Lumpur',
    dest_malaysia_desc: 'Dynamic metropolitan hub, modern shopping, and scenic natural escapes.',
    dest_qatar_country: 'Doha',
    dest_qatar_desc: 'World-class hospitality, cultural museums, and premier air transit center.',

    form_full_name: 'Full Name',
    form_phone: 'Phone Number',
    form_email: 'Email Address',
    form_destination: 'Destination',
    form_travel_date: 'Travel Date',
    form_return_date: 'Return Date (Optional)',
    form_departure_date: 'Departure Date',
    form_passengers: 'Number of Passengers',
    form_travel_class: 'Travel Class',
    form_additional_req: 'Additional Requirements or Notes',
    form_submit_request: 'Submit Request',
    form_submitting: 'Processing Your Request...',
    form_required_note: 'Fields marked with * are required.',
    form_privacy_assurance: 'Your information is kept strictly confidential and sent directly to Balcad Travel Agency.',

    track_title: 'Check My Order',
    track_subtitle: 'Track the status of your travel request securely using your Reference ID and contact details.',
    track_order_id: 'Order Reference ID',
    track_order_id_placeholder: 'e.g. BT-000125',
    track_verify_field: 'Phone Number or Email (for verification)',
    track_verify_placeholder: 'e.g. 612483838 or your email',
    track_search_btn: 'Look Up Order',
    track_searching: 'Searching Records...',
    track_result_heading: 'Order Details',
    track_status_label: 'Status',
    track_service_label: 'Service',
    track_customer_label: 'Customer',
    track_created_label: 'Submitted Date',
    track_updated_label: 'Last Updated',
    track_summary_label: 'Trip Summary',
    track_security_notice: 'Customer Security: Internal staff details, supplier costs, and proprietary records are protected and never displayed.',
    track_not_found: 'No order was found matching the provided Reference ID and contact credentials. Please double check and try again.',

    about_heading: 'About Balcad Travel Agency',
    about_tagline: 'Professional travel services and dedicated customer support.',
    about_mission_title: 'Our Mission & Commitment',
    about_mission_desc: 'To provide reliable, stress-free travel solutions for individuals, families, and organizations, backed by attentive local customer support and international airline credentials.',
    about_values_title: 'Trust & Clear Communication',
    about_values_desc: 'We operate on transparent communication, verified itinerary recommendations, and dedicated assistance before departure, during transit, and upon arrival.',
    contact_heading: 'Contact Our Travel Team',
    contact_title: 'Get in Touch with Balcad Travel',
    contact_subtitle: 'Reach out directly by phone, email, or submit an inquiry below.',
    contact_phone_title: 'Direct Phone Lines',
    contact_email_title: 'Customer Email',
    contact_call_now: 'Call Now',
    contact_send_email: 'Send Email',
    contact_whatsapp: 'Message on WhatsApp',

    check_order_title: 'Track Your Service Order',
    check_order_subtitle: 'Enter your Reference ID and verified phone or email to inspect order progress safely.',
    check_order_input_id: 'Order Reference ID (e.g. BT-000125)',
    check_order_input_contact: 'Phone Number or Email for Verification',
    check_order_btn: 'Check Order Status',
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Clear answers on requesting services, booking flights, visas, and tracking orders.',
    request_service_title: 'Request a Travel Service',
    request_service_subtitle: 'Submit your requirements and our ticketing desk will prepare the best options for you.',

    footer_tagline: 'Your trusted partner for international flights, visa assistance, hotel reservations, and holy pilgrimages.',
    footer_quick_links: 'Quick Links',
    footer_services_links: 'Our Services',
    footer_contact_info: 'Contact Information',
    footer_rights: '© 2026 Balcad Travel Agency. All rights reserved.',
  },

  so: {
    nav_home: 'Bogga Hore',
    nav_about: 'Nagu Saabsan',
    nav_services: 'Adeegyada',
    nav_destinations: 'Meelaha Loo Safro',
    nav_faq: 'Su’aalaha Badan',
    nav_contact: 'Nala Soo Xiriir',
    nav_request_service: 'Dalbo Adeeg',
    nav_check_order: 'Hubi Dalabkayga',

    hero_eyebrow: 'WAKAALADDA SAFARKA BALCAD',
    hero_title_line1: 'Safarkaaga.',
    hero_title_line2: 'Garabkeena.',
    hero_subtitle: 'Ka dalbo tikidhada diyaaradaha, fiisooyinka, hoteellada, dalxiiska iyo adeegyada kale Wakaaladda Safarka Balcad.',
    hero_cta_request: 'Dalbo Adeeg',
    hero_cta_explore: 'Baadh Adeegyada',
    hero_slogan: 'Safro Waxbadan, Welwelkuna Ha Yaraado',

    badge_support_title: 'Taageero Joogto Ah',
    badge_support_desc: 'La-talin toos ah oo ka timid shaqaale khibrad u leh safarada.',
    badge_visa_title: 'Kaalmada Fiisada',
    badge_visa_desc: 'Dib-u-eegis xirfadeed iyo taageero codsiga fiisooyinka.',
    badge_flights_title: 'Tikidhada Caalamiga',
    badge_flights_desc: 'Duullimaadyada shirkadaha waaweyn ee caalamka oo dhan.',
    badge_spiritual_title: 'Adeegyada Cumrada & Xajka',
    badge_spiritual_desc: 'Adeeg dhammaystiran oo loogu talagalay booqashada Makkah & Madinah.',

    services_eyebrow: 'ADEEGYADAYADA',
    services_heading: 'Adeegyo Safar Oo Fudud',
    services_view_all: 'Eeg Dhammaan Adeegyada',
    service_request_btn: 'Dalbo Adeeg',

    service_flight_title: 'Tikidhada Diyaaradaha',
    service_flight_desc: 'Dalbo duullimaadyadaada caalamiga iyo kuwa gudaha oo leh caawimaad buuxda.',
    service_visa_title: 'Adeegyada Fiisooyinka',
    service_visa_desc: 'Hel fiisadaada adoo helaya taageero xirfadeed iyo hagis tallaabo-tallaabo ah.',
    service_hotel_title: 'Dalbashada Hoteellada',
    service_hotel_desc: 'Ka hel hoteellada iyo goobaha ugu wanaagsan magaalada aad ku socoto si raaxo leh.',
    service_umrah_title: 'Cumro & Xaj',
    service_umrah_desc: 'Safarrada barakeysan oo ay weheliyaan safarka, fiisada iyo hoteellada ku habboon.',
    service_tour_title: 'Xirmooyinka Dalxiiska',
    service_tour_desc: 'Booqo meelaha ugu quruxda badan adduunka adiga iyo qoyskaaga ama kooxdaada.',
    service_transfer_title: 'Gaadiidka Garoonka',
    service_transfer_desc: 'Gaadiid aamin ah, waqtigiisa ilaaliya oo raaxo leh garoonka diyaaradaha.',
    service_doc_title: 'Dukumiintiyada Safarka',
    service_doc_desc: 'Kaalmo xirfadeed oo ku saabsan sharciga safarka, tarjumaada iyo waraaqaha muhiimka ah.',
    service_intl_title: 'Safarka Caalamiga',
    service_intl_desc: 'Safarro dalal badan ah iyo adeeg heersare ah oo caalami ah.',
    service_regional_title: 'Safarka Gudaha & Gobolka',
    service_regional_desc: 'Baro goobaha quruxda badan ee dalka iyo gobolka adoo si fudud u safraya.',
    service_other_title: 'Adeegyo Safar Oo Gaar Ah',
    service_other_desc: 'Adeegyo safar oo si gaar ah loogu habeeyay baahiyahaaga gaarka ah.',

    destinations_eyebrow: 'MEELAHA UGU CAANSAN',
    destinations_heading: 'Soo Baro Goobo Cajiib Ah',
    destinations_subtitle: 'U safar adduunka adigoo dooranaya meelaha ugu caansan.',
    destinations_view_all: 'Eeg Dhammaan Meelaha',
    destinations_explore_btn: 'Baadh / Dalbo',

    dest_dubai_country: 'Imaaraadka Carabta',
    dest_dubai_desc: 'Magaalo casri ah, dhismooyin caalami ah iyo xudunta ganacsiga iyo safarka.',
    dest_istanbul_country: 'Turkiga',
    dest_istanbul_desc: 'Magaalo taariikhi ah oo isku xirta Bariga iyo Galbeedka, suuqyo firfircoon.',
    dest_makkah_country: 'Sucuudi Carabiya',
    dest_makkah_desc: 'Magaalada barakeysan ee Cumrada iyo Xajka ee Muslimiinta adduunka oo dhan.',
    dest_maldives_country: 'Badweynta Hindiya',
    dest_maldives_desc: 'Jasiirado qurux badan, biyo nadiif ah iyo goobo lagu nasto.',
    dest_malaysia_country: 'Kuala Lumpur',
    dest_malaysia_desc: 'Xarun casri ah, goobo dukaameysi iyo dabeecad qurux badan.',
    dest_qatar_country: 'Dooxa',
    dest_qatar_desc: 'Martigelin caalami ah, madxafyo dhaqameed iyo marin safar oo caan ah.',

    form_full_name: 'Magaca Oo Dhan',
    form_phone: 'Lambarka Taleefanka',
    form_email: 'Cinwaanka Email-ka',
    form_destination: 'Magaalada Loo Socdo',
    form_travel_date: 'Taariikhda Safarka',
    form_return_date: 'Taariikhda Soo Laabashada (Haddii ay jirto)',
    form_departure_date: 'Taariikhda Baxitaanka',
    form_passengers: 'Tirada Rakaabka',
    form_travel_class: 'Heerka Kursiga',
    form_additional_req: 'Faahfaahin ama Codsi Dheeraad Ah',
    form_submit_request: 'Dir Dalabka',
    form_submitting: 'Waa La Dirayaa...',
    form_required_note: 'Goobaha leh calaamadda * waa qasab.',
    form_privacy_assurance: 'Xogtaadu waa mid qarsoodi ah oo si toos ah loogu dirayo Wakaaladda Safarka Balcad.',

    track_title: 'Hubi Dalabkayga',
    track_subtitle: 'Kala soco xaaladda codsigaaga safarka adoo isticmaalaya lambarka tixraaca iyo xogtaada.',
    track_order_id: 'Lambarka Tixraaca Dalabka',
    track_order_id_placeholder: 'Tusaale: BT-000125',
    track_verify_field: 'Taleefanka ama Email-ka (Xaqiijinta)',
    track_verify_placeholder: 'Tusaale: 612483838 ama email-kaaga',
    track_search_btn: 'Raadi Dalabka',
    track_searching: 'Waa la baarayaa...',
    track_result_heading: 'Faahfaahinta Dalabka',
    track_status_label: 'Xaaladda',
    track_service_label: 'Adeegga',
    track_customer_label: 'Macaamiilka',
    track_created_label: 'Taariikhda La Diray',
    track_updated_label: 'Kala Beddelka Ugu Dambeeyay',
    track_summary_label: 'Faahfaahinta Safarka',
    track_security_notice: 'Ilaalinta Macaamiilka: Xogta gudaha ee shirkadda iyo xisaabaadka gaarka ah ma muuqdaan.',
    track_not_found: 'Lama helin dalab la xiriira tixraaca iyo xogta aad gelisay. Fadlan hubi oo mar kale isku day.',

    about_heading: 'Ku Saabsan Wakaaladda Safarka Balcad',
    about_tagline: 'Adeeg safar oo tayo leh iyo taageero hufan oo macmiilka ah.',
    about_mission_title: 'Hadafkayaga & Ballanqaadkayaga',
    about_mission_desc: 'Inaan siinno macaamiisheenna xalal safar oo aamin ah, fudud, isla markaana leh taageero joogto ah iyo xiriir toos ah oo shirkadaha diyaaradaha caalamka ah.',
    about_values_title: 'Kalsooni & Xiriir Cad',
    about_values_desc: 'Waxaan ku shaqeynaa hufnaan, jadwal sugan, iyo daryeel joogto ah inta aadan dhoofin, inta aad ku guda jirto safarka, iyo marka aad tagto meesha aad u socoto.',
    contact_heading: 'La Soo Xiriir Kooxdayada Safarka',
    contact_title: 'La Soo Xiriir Wakaaladda Safarka Balcad',
    contact_subtitle: 'Toos noogala soo xiriir taleefannada, email-ka, ama foomka hoose buuxi.',
    contact_phone_title: 'Khadadka Taleefanka',
    contact_email_title: 'Email-ka Macaamiisha',
    contact_call_now: 'Wac Hadda',
    contact_send_email: 'Dir Email',
    contact_whatsapp: 'Farriin WhatsApp ah',

    check_order_title: 'Hubi Xaaladda Dalabkaaga',
    check_order_subtitle: 'Geli Lambarka Tixraaca iyo taleefankaaga ama email-kaaga si aad u aragto xaaladda safarkaaga.',
    check_order_input_id: 'Lambarka Tixraaca Dalabka (sida BT-000125)',
    check_order_input_contact: 'Taleefanka ama Email-ka Xaqiijinta',
    check_order_btn: 'Hubi Dalabka',
    faq_title: 'Su’aalaha Inta Badan La Isweydiiyo',
    faq_subtitle: 'Jawaabo cad oo ku saabsan dalbashada adeegyada, tikidhada diyaaradaha, fiisooyinka iyo la socodka dalabka.',
    request_service_title: 'Dalbo Adeeg Safar',
    request_service_subtitle: 'Geli baahidaada safarka oo shaqaalahayaga tikidhadu waxay kuu diyaarin doonaan fursadaha ugu wanaagsan.',

    footer_tagline: 'Saaxiibkaaga lagu kalsoonaan karo ee tikidhada diyaaradaha, fiisooyinka, hoteellada iyo Cumrada & Xajka.',
    footer_quick_links: 'Xiriirinta Degdegga Ah',
    footer_services_links: 'Adeegyadayada',
    footer_contact_info: 'Xogta Xiriirka',
    footer_rights: '© 2026 Wakaaladda Safarka Balcad. Xuquuqda oo dhan way dhowran tahay.',
  },

  ar: {
    nav_home: 'الرئيسية',
    nav_about: 'من نحن',
    nav_services: 'خدماتنا',
    nav_destinations: 'الوجهات',
    nav_faq: 'الأسئلة الشائعة',
    nav_contact: 'اتصل بنا',
    nav_request_service: 'طلب خدمة',
    nav_check_order: 'متابعة طلبي',

    hero_eyebrow: 'وكالة بلعد للسفريات والسياحة',
    hero_title_line1: 'رحلتكم.',
    hero_title_line2: 'برعايتنا.',
    hero_subtitle: 'اطلب تذاكر الطيران، التأشيرات، الفنادق، الجولات السياحية وخدمات السفر الأخرى من وكالة بلعد للسفريات.',
    hero_cta_request: 'طلب خدمة',
    hero_cta_explore: 'استكشف الخدمات',
    hero_slogan: 'سافر براحة واطمئنان',

    badge_support_title: 'دعم ومتابعة متواصلة',
    badge_support_desc: 'استشارات مباشرة ومتابعة دقيقة من مستشاري السفر لدينا.',
    badge_visa_title: 'خدمات التأشيرات',
    badge_visa_desc: 'تدقيق المستندات ومساعدتكم في إجراءات التقديم بكل احترافية.',
    badge_flights_title: 'حجز طيران دولي',
    badge_flights_desc: 'رحلات عبر كبرى خطوط الطيران العالمية بأفضل الخيارات.',
    badge_spiritual_title: 'رحلات العمرة والحج',
    badge_spiritual_desc: 'خدمات متكاملة ورعاية خاصة للزيارات المباركة لمكة والمدينة.',

    services_eyebrow: 'خدماتنا المتميزة',
    services_heading: 'خدمات السفر بكل سهولة',
    services_view_all: 'عرض كافة الخدمات',
    service_request_btn: 'طلب الخدمة',

    service_flight_title: 'تذاكر الطيران',
    service_flight_desc: 'احجز رحلاتك الدولية والداخلية مع خدمة حجز متكاملة ومخصصة.',
    service_visa_title: 'خدمات التأشيرات',
    service_visa_desc: 'استخرج تأشيرتك مع فريقنا المتخصص وتوجيهات واضحة خطوة بخطوة.',
    service_hotel_title: 'حجز الفنادق',
    service_hotel_desc: 'اعثر على أرقى الفنادق والمنتجعات في وجهتك بكل راحة ويسر.',
    service_umrah_title: 'العمرة والحج',
    service_umrah_desc: 'رحلات إيمانية مباركة تشمل تيسير السفر والإقامة والتأشيرات.',
    service_tour_title: 'الباقات السياحية',
    service_tour_desc: 'استكشف أروع الوجهات السياحية العالمية المصممة لتناسب رغباتك.',
    service_transfer_title: 'توصيل المطار',
    service_transfer_desc: 'خدمة نقل آمنة، مريحة ودقيقة المواعيد من وإلى المطار.',
    service_doc_title: 'مستندات السفر',
    service_doc_desc: 'مساعدة متخصصة في تجهيز وثائق وتصاريح السفر والترجمة.',
    service_intl_title: 'السفر الدولي',
    service_intl_desc: 'مسارات سفر حول العالم مع أرقى معايير الضيافة والخدمة.',
    service_regional_title: 'السفر المحلي والإقليمي',
    service_regional_desc: 'استكشف أجمل المعالم الإقليمية برحلات ميسرة ومريحة.',
    service_other_title: 'خدمات سفر أخرى',
    service_other_desc: 'ترتيبات خاصة مصممة لتلبية متطلبات سفرك الفردية أو العائلية.',

    destinations_eyebrow: 'أشهر الوجهات',
    destinations_heading: 'اكتشف وجهات استثنائية',
    destinations_subtitle: 'سافر حول العالم مع وجهاتنا المختارة بعناية.',
    destinations_view_all: 'عرض جميع الوجهات',
    destinations_explore_btn: 'استكشاف / طلب',

    dest_dubai_country: 'الإمارات العربية المتحدة',
    dest_dubai_desc: 'الفخامة الحديثة، المعمار العالمي ومركز الترانزيت الأول في المنطقة.',
    dest_istanbul_country: 'تركيا',
    dest_istanbul_desc: 'ملتقى الشرق والغرب، المعالم التاريخية الساحرة والأسواق الحيوية.',
    dest_makkah_country: 'المملكة العربية السعودية',
    dest_makkah_desc: 'المهوى الروحي للمسلمين وأداء مناسك الحج والعمرة والزيارة.',
    dest_maldives_country: 'المحيط الهندي',
    dest_maldives_desc: 'فيلات عائمة فوق المياه الفيروزية وأجواء استرخاء فائقة الهدوء.',
    dest_malaysia_country: 'كوالالمبور',
    dest_malaysia_desc: 'عاصمة متألقة، أسواق عصرية وتجارب طبيعية استوائية ساحرة.',
    dest_qatar_country: 'الدوحة',
    dest_qatar_desc: 'ضيافة عالمية رفيعة، متاحف ثقافية وتجربة ترانزيت متميزة.',

    form_full_name: 'الاسم الكامل',
    form_phone: 'رقم الهاتف',
    form_email: 'البريد الإلكتروني',
    form_destination: 'الوجهة المقصودة',
    form_travel_date: 'تاريخ السفر',
    form_return_date: 'تاريخ العودة (اختياري)',
    form_departure_date: 'تاريخ المغادرة',
    form_passengers: 'عدد المسافرين',
    form_travel_class: 'درجة السفر',
    form_additional_req: 'متطلبات إضافية أو ملاحظات',
    form_submit_request: 'إرسال الطلب',
    form_submitting: 'جاري إرسال الطلب...',
    form_required_note: 'الحقول المشار إليها بـ * إلزامية.',
    form_privacy_assurance: 'معلوماتكم محمية بأعلى درجات السرية وترسل مباشرة لوكالة بلعد للسفريات.',

    track_title: 'متابعة طلبي',
    track_subtitle: 'تحقق من حالة طلب السفر الخاص بك باستخدام الرقم المرجعي ورقم هاتفك أو بريدك بأمان.',
    track_order_id: 'الرقم المرجعي للطلب',
    track_order_id_placeholder: 'مثال: BT-000125',
    track_verify_field: 'رقم الهاتف أو البريد الإلكتروني (للتحقق)',
    track_verify_placeholder: 'مثال: 612483838 أو بريدك الإلكتروني',
    track_search_btn: 'بحث عن الطلب',
    track_searching: 'جاري البحث...',
    track_result_heading: 'تفاصيل الطلب',
    track_status_label: 'الحالة',
    track_service_label: 'نوع الخدمة',
    track_customer_label: 'اسم العميل',
    track_created_label: 'تاريخ التقديم',
    track_updated_label: 'آخر تحديث',
    track_summary_label: 'ملخص الرحلة',
    track_security_notice: 'حماية خصوصية العميل: المعلومات الداخلية الخاصة بالموظفين وتكاليف الموردين مشفرة وغير معروضة.',
    track_not_found: 'لم يتم العثور على أي طلب يطابق الرقم المرجعي وبيانات التحقق المدخلة. يرجى التحقق وإعادة المحاولة.',

    about_heading: 'عن وكالة بلعد للسفريات',
    about_tagline: 'خدمات سفر احترافية ومساندة متفانية للعملاء.',
    about_mission_title: 'رسالتنا والتزامنا',
    about_mission_desc: 'تقديم حلول سفر مريحة وموثوقة للمسافرين والعائلات والمؤسسات، مدعومة بخدمة عملاء مباشرة وموثوقية في حجز خطوط الطيران العالمية.',
    about_values_title: 'الثقة والتواصل الواضح',
    about_values_desc: 'نعمل وفق أعلى معايير الشفافية، ومطابقة جداول الرحلات، وتقديم الدعم المتواصل قبل السفر وأثناء الترانزيت حتى الوصول لوجهتكم.',
    contact_heading: 'تواصل مع مستشاري السفر',
    contact_title: 'تواصل مع وكالة بلعد للسفريات',
    contact_subtitle: 'يمكنكم الاتصال مباشرة بالأرقام التالية، أو إرسال بريد، أو تقديم استفساركم عبر النموذج.',
    contact_phone_title: 'أرقام الهاتف المباشرة',
    contact_email_title: 'البريد الإلكتروني للعملاء',
    contact_call_now: 'اتصل الآن',
    contact_send_email: 'إرسال بريد',
    contact_whatsapp: 'مراسلة عبر واتساب',

    check_order_title: 'متابعة حالة الطلب',
    check_order_subtitle: 'أدخل الرقم المرجعي للطلب مع رقم الهاتف أو البريد الإلكتروني للتحقق من الحالة بأمان.',
    check_order_input_id: 'الرقم المرجعي للطلب (مثال: BT-000125)',
    check_order_input_contact: 'رقم الهاتف أو البريد للتحقق',
    check_order_btn: 'فحص حالة الطلب',
    faq_title: 'الأسئلة المتكررة والشائعة',
    faq_subtitle: 'إجابات واضحة حول طلب الخدمات، حجز التذاكر، التأشيرات ومتابعة الطلبات.',
    request_service_title: 'طلب خدمة سفر',
    request_service_subtitle: 'أرسل تفاصيل رحلتك ومتطلباتك وسيقوم فريقنا بإعداد أفضل خطط السفر لكم.',

    footer_tagline: 'شريككم الموثوق لحجوزات الطيران، خدمات التأشيرات، الفنادق، ورحلات العمرة والحج المباركة.',
    footer_quick_links: 'روابط سريعة',
    footer_services_links: 'خدماتنا',
    footer_contact_info: 'بيانات الاتصال',
    footer_rights: '© 2026 وكالة بلعد للسفريات. جميع الحقوق محفوظة.',
  },
};
