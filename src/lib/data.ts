import { DestinationItem, ServiceItem, CustomerOrder } from '../types';

export const COMPANY_INFO = {
  name: 'Balcad Travel Agency',
  phones: ['612483838', '612141414'],
  formattedPhones: ['+252 61 248 3838', '+252 61 214 1414'],
  primaryPhone: '612483838',
  email: 'balcadtravel@gmail.com',
  whatsappUrl: 'https://wa.me/252612483838',
  hours: 'Monday – Sunday: 8:00 AM – 8:00 PM (EAT)',
  address: 'Mogadishu Main Operations & International Travel Desk, Somalia',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'flight',
    titleKey: 'service_flight_title',
    descKey: 'service_flight_desc',
    iconName: 'Plane',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=85',
    badge: 'Popular',
    pageRoute: 'flight-tickets',
  },
  {
    id: 'visa',
    titleKey: 'service_visa_title',
    descKey: 'service_visa_desc',
    iconName: 'FileCheck',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=85',
    badge: 'Fast Processing',
    pageRoute: 'visa-services',
  },
  {
    id: 'hotel',
    titleKey: 'service_hotel_title',
    descKey: 'service_hotel_desc',
    iconName: 'Building2',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85',
    badge: 'Verified Stays',
    pageRoute: 'hotel-booking',
  },
  {
    id: 'umrah-hajj',
    titleKey: 'service_umrah_title',
    descKey: 'service_umrah_desc',
    iconName: 'Moon',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=85',
    badge: 'Spiritual Journeys',
    pageRoute: 'umrah-hajj',
  },
  {
    id: 'tour',
    titleKey: 'service_tour_title',
    descKey: 'service_tour_desc',
    iconName: 'Compass',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85',
    badge: 'Curated Tours',
    pageRoute: 'tour-packages',
  },
  {
    id: 'airport-transfer',
    titleKey: 'service_transfer_title',
    descKey: 'service_transfer_desc',
    iconName: 'Car',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=85',
    badge: 'Reliable VIP',
    pageRoute: 'request-service',
  },
  {
    id: 'documentation',
    titleKey: 'service_doc_title',
    descKey: 'service_doc_desc',
    iconName: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=85',
    pageRoute: 'request-service',
  },
  {
    id: 'international',
    titleKey: 'service_intl_title',
    descKey: 'service_intl_desc',
    iconName: 'Globe',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=85',
    pageRoute: 'request-service',
  },
  {
    id: 'regional',
    titleKey: 'service_regional_title',
    descKey: 'service_regional_desc',
    iconName: 'MapPin',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=85',
    pageRoute: 'request-service',
  },
  {
    id: 'other',
    titleKey: 'service_other_title',
    descKey: 'service_other_desc',
    iconName: 'PlusCircle',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1000&q=85',
    pageRoute: 'request-service',
  },
];

export const DESTINATIONS_DATA: DestinationItem[] = [
  {
    id: 'dubai',
    nameKey: 'Dubai',
    countryKey: 'dest_dubai_country',
    descKey: 'dest_dubai_desc',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Luxury Shopping', 'World Hub'],
    region: 'middle-east',
  },
  {
    id: 'istanbul',
    nameKey: 'Istanbul',
    countryKey: 'dest_istanbul_country',
    descKey: 'dest_istanbul_desc',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=85',
    highlights: ['Blue Mosque', 'Bosphorus Cruise', 'Grand Bazaar', 'Historic Sultanahmet'],
    region: 'europe',
  },
  {
    id: 'makkah',
    nameKey: 'Makkah',
    countryKey: 'dest_makkah_country',
    descKey: 'dest_makkah_desc',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=85',
    highlights: ['Masjid al-Haram', 'Kaaba', 'Spiritual Solace', 'Pilgrim Assistance'],
    region: 'middle-east',
  },
  {
    id: 'maldives',
    nameKey: 'Maldives',
    countryKey: 'dest_maldives_country',
    descKey: 'dest_maldives_desc',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=85',
    highlights: ['Overwater Villas', 'Turquoise Lagoons', 'Serene Escapes', 'Private Resorts'],
    region: 'asia',
  },
  {
    id: 'malaysia',
    nameKey: 'Malaysia',
    countryKey: 'dest_malaysia_country',
    descKey: 'dest_malaysia_desc',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=85',
    highlights: ['Petronas Towers', 'Batu Caves', 'Langkawi Beaches', 'Family Friendly'],
    region: 'asia',
  },
  {
    id: 'qatar',
    nameKey: 'Qatar',
    countryKey: 'dest_qatar_country',
    descKey: 'dest_qatar_desc',
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1000&q=85',
    highlights: ['Doha Corniche', 'Souq Waqif', 'Museum of Islamic Art', 'Transit Hub'],
    region: 'middle-east',
  },
];

export const TOUR_PACKAGES_DATA = [
  {
    id: 'dubai-luxury',
    title: 'Dubai City & Desert Experience',
    destination: 'Dubai, UAE',
    duration: '5 Days / 4 Nights',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85',
    description: 'Experience futuristic skyscrapers, golden desert dunes, and Arabian luxury.',
    highlights: ['Luxury Hotel Stay', 'Desert Safari & BBQ Dinner', 'Dubai Marina Cruise', 'Airport Transfers'],
    features: ['Luxury Hotel Stay', 'Desert Safari & BBQ Dinner', 'Dubai Marina Cruise', 'Airport Transfers'],
  },
  {
    id: 'turkey-highlights',
    title: 'Istanbul & Historical Heritage',
    destination: 'Istanbul, Turkey',
    duration: '7 Days / 6 Nights',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=85',
    description: 'Immerse in Byzantine and Ottoman marvels, Bosphorus vistas, and culinary delights.',
    highlights: ['Central City Accommodation', 'Bosphorus Yacht Tour', 'Guided Historical Sightseeing', 'Visa Consultation'],
    features: ['Central City Accommodation', 'Bosphorus Yacht Tour', 'Guided Historical Sightseeing', 'Visa Consultation'],
  },
  {
    id: 'umrah-essential',
    title: 'Umrah Pilgrimage Complete Program',
    destination: 'Makkah & Madinah, Saudi Arabia',
    duration: '10 Days / 9 Nights',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=85',
    description: 'A serene holy journey with guidance, high-speed train, and hotels near the holy sites.',
    highlights: ['Haram-Adjacent Hotels', 'High-Speed Haramain Train', 'Dedicated Ground Assistance', 'Ziyarah Tours'],
    features: ['Haram-Adjacent Hotels', 'High-Speed Haramain Train', 'Dedicated Ground Assistance', 'Ziyarah Tours'],
  },
  {
    id: 'malaysia-getaway',
    title: 'Malaysia Cultural & City Escape',
    destination: 'Kuala Lumpur & Genting',
    duration: '6 Days / 5 Nights',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=85',
    description: 'Explore modern architectural marvels, rainforests, and multicultural heritage.',
    highlights: ['Premier Hotel Selection', 'Theme Park & Cable Car Pass', 'Private Transport', 'Guided Tours'],
    features: ['Premier Hotel Selection', 'Theme Park & Cable Car Pass', 'Private Transport', 'Guided Tours'],
  },
  {
    id: 'maldives-island',
    title: 'Tropical Island Relaxation',
    destination: 'Maldives Archipelago',
    duration: '5 Days / 4 Nights',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=85',
    description: 'Overwater luxury villas surrounded by crystal turquoise lagoons and coral reefs.',
    highlights: ['Overwater Villa / Beach Villa', 'Speedboat or Seaplane Transfer', 'All-Inclusive Dining Options', 'Snorkeling & Water Sports'],
    features: ['Overwater Villa / Beach Villa', 'Speedboat or Seaplane Transfer', 'All-Inclusive Dining Options', 'Snorkeling & Water Sports'],
  },
  {
    id: 'east-africa-safari',
    title: 'East Africa Wildlife & Nature',
    destination: 'Kenya & Tanzania',
    duration: '6 Days / 5 Nights',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=85',
    description: 'Discover the Great Rift Valley, wildlife safaris, and pristine nature reserves.',
    highlights: ['Safari Game Drives', 'Eco-Lodge Stays', 'Professional Park Rangers', 'Full Ground Transport'],
    features: ['Safari Game Drives', 'Eco-Lodge Stays', 'Professional Park Rangers', 'Full Ground Transport'],
  },
];

export interface FaqItem {
  id: string;
  questionEn: string;
  questionSo: string;
  questionAr: string;
  answerEn: string;
  answerSo: string;
  answerAr: string;
}

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    questionEn: 'Can I request a service online?',
    questionSo: 'Ma ka dalban karaa adeeg online-ka?',
    questionAr: 'هل يمكنني طلب خدمة عبر الموقع؟',
    answerEn:
      'Yes, you can easily submit your service request for flight tickets, visas, hotel bookings, Umrah & Hajj, or tours directly through our website forms. Our travel coordinators will review your details immediately and contact you with available options.',
    answerSo:
      'Haa, waxaad si fudud codsi adeeg ugu diri kartaa tikidhada diyaaradaha, fiisooyinka, hoteellada, Cumrada & Xajka ama dalxiiska adoo adeegsanaya foomamka websaydhka. Shaqaalahayaga safarka ayaa isla markiiba eegi doona xogtaada oo kula soo xiriiri doona.',
    answerAr:
      'نعم، يمكنك تقديم طلبك بكل سهولة لحجوزات الطيران، التأشيرات، الفنادق، العمرة والحج أو الرحلات السياحية عبر نماذج الموقع. سيقوم مستشارو السفر بمراجعة تفاصيل طلبك والتواصل معك بأسرع وقت بالخيارات المتاحة.',
  },
  {
    id: 'faq-2',
    questionEn: 'Is online payment available?',
    questionSo: 'Lacag bixin online ma ka jirtaa websaydhka?',
    questionAr: 'هل يتوفر الدفع الإلكتروني عبر الموقع؟',
    answerEn:
      'No, our website does not require or process online payments. All requests are submitted without immediate charge. Once our team prepares your customized itinerary and quotes, convenient official payment arrangements will be finalized directly with our authorized staff.',
    answerSo:
      'Maya, websaydheenu ma qaato mana sameeyo lacag bixin toos ah oo online ah. Dhammaan codsiyada waxaa lagu diraa bilaash. Marka kooxdayadu kuu diyaariso faahfaahinta safarka iyo qiimaha, qaabka rasmiga ah ee bixinta waxaa lagu heshiin doonaa si toos ah oo aamin ah.',
    answerAr:
      'لا، لا يتطلب موقعنا ولا يعالج أي مدفوعات إلكترونية مباشرة. جميع الطلبات يتم إرسالها دون أي رسوم فورية. بعد مراجعة طلبكم وإعداد العرض المناسب، يتم ترتيب الدفع الرسمي والموثق مباشرة مع مستشارينا المعتمدين.',
  },
  {
    id: 'faq-3',
    questionEn: 'How do I submit a flight request?',
    questionSo: 'Sideen u diraa codsiga tikidhada diyaaradda?',
    questionAr: 'كيف يمكنني تقديم طلب تذكرة طيران؟',
    answerEn:
      'Navigate to the Flight Tickets page or click "Request a Service". Provide your departure and arrival cities, travel dates, passenger count, preferred class, and contact details. We will check live airline inventories and reach out with the best schedules.',
    answerSo:
      'Tag bogga Tikidhada Diyaaradaha ama riix "Dalbo Adeeg". Geli magaalada aad ka baxayso iyo meesha aad u socoto, taariikhaha safarka, tirada rakaabka, heerka kursiga iyo xiriirkaaga. Waxaan baari doonnaa duullimaadyada ugu habboon.',
    answerAr:
      'انتقل إلى صفحة تذاكر الطيران أو اضغط على "طلب خدمة". أدخل مدينتي المغادرة والوصول، مواعيد السفر، عدد المسافرين، الدرجة المطلوبة وبيانات الاتصال، وسيقوم فريقنا بفحص جداول الخطوط العالمية والتواصل معكم بأفضل الخيارات.',
  },
  {
    id: 'faq-4',
    questionEn: 'How do I request a visa service?',
    questionSo: 'Sideen u codsadaa adeegga fiisada?',
    questionAr: 'كيف يمكنني طلب خدمة تأشيرة؟',
    answerEn:
      'Visit our dedicated Visa Services page and fill in your destination country, visa category (e.g. tourist, business, transit), intended travel date, and nationality. Our visa experts will outline document requirements and handle application guidance.',
    answerSo:
      'Booqo bogga Adeegyada Fiisooyinka oo buuxi dalka aad u socoto, nooca fiisada (sida dalxiis, ganacsi, transit), taariikhda safarka iyo dhalashadaada. Khabiiradayada fiisooyinka ayaa kuu faahfaahin doona shuruudaha.',
    answerAr:
      'تفضل بزيارة صفحة خدمات التأشيرات وسجل الدولة المقصودة، نوع التأشيرة (سياحية، تجارية، عبور)، وتاريخ السفر المقترح وجنسيتك. سيقوم خبراؤنا بتوضيح المتطلبات ومساعدتكم خطوة بخطوة في استكمال الملف.',
  },
  {
    id: 'faq-5',
    questionEn: 'How do I check my order?',
    questionSo: 'Sideen ku hubin karaa xaaladda dalabkayga?',
    questionAr: 'كيف يمكنني متابعة حالة طلبي؟',
    answerEn:
      'When you submit a request, you will receive a unique Reference ID (such as BT-000125). Click on "Check My Order" in the top navigation or footer, enter your Reference ID and your verified phone number or email to view your current status.',
    answerSo:
      'Markaad codsi dirto, waxaad helaysaa lambar tixraac oo gaar ah (sida BT-000125). Guji "Hubi Dalabkayga" oo ku yaalla madaxa ama gunta websaydhka, geli lambarka tixraaca iyo lambarkaaga taleefanka si aad u aragto xaaladda.',
    answerAr:
      'عند إرسال أي طلب عبر الموقع، ستتلقى رقماً مرجعياً فريداً (مثل BT-000125). اضغط على "متابعة طلبي" في القائمة العلوية أو أسفل الصفحة، ثم أدخل الرقم المرجعي مع رقم هاتفك أو بريدك الإلكتروني للاطلاع على آخر التحديثات بأمان.',
  },
  {
    id: 'faq-6',
    questionEn: 'How will Balcad Travel contact me?',
    questionSo: 'Sidee Wakaaladda Safarka Balcad iila soo xiriiri doontaa?',
    questionAr: 'كيف ستتواصل معي وكالة بلعد للسفريات؟',
    answerEn:
      'Our team will contact you directly via the phone number (call or WhatsApp) or email provided in your request. You can also reach our lines at 612483838 or 612141414 at any time.',
    answerSo:
      'Kooxdayadu waxay si toos ah kuugula soo xiriiri doonaan taleefanka (wacitaan ama WhatsApp) ama email-ka aad gelisay codsigaaga. Sidoo kale waxaad nagala soo xiriiri kartaa 612483838 ama 612141414.',
    answerAr:
      'سيتواصل معكم فريقنا المخصص مباشرة عبر الهاتف (مكالمة أو رسالة واتساب) أو البريد الإلكتروني المدخل في طلبكم. كما يسرنا استقبال اتصالاتكم في أي وقت عبر 612483838 أو 612141414.',
  },
  {
    id: 'faq-7',
    questionEn: 'Can I request a service other than the listed services?',
    questionSo: 'Ma codsan karaa adeeg aan ahayn kuwa halkan ku qoran?',
    questionAr: 'هل يمكنني طلب خدمة غير مذكورة في القائمة؟',
    answerEn:
      'Absolutely. Use our universal "Request a Service" form and select "Other Travel Services" or contact us directly. We accommodate custom travel itineraries, emergency transfers, specialized document legalization, and group arrangements.',
    answerSo:
      'Hubaal. Isticmaal foomka guud ee "Dalbo Adeeg" oo dooro "Adeegyo Safar Oo Gaar Ah" ama toos nala soo xiriir. Waxaan diyaarinnaa safarro gaar ah, baahiyo degdeg ah, iyo adeegyo qoys ama kooxeed.',
    answerAr:
      'بالتأكيد. يمكنك استخدام نموذج "طلب خدمة" واختيار "خدمات سفر أخرى" أو الاتصال بنا مباشرة. نوفر ترتيبات مخصصة، حجوزات المجموعات، والإجراءات المستعجلة والخاصة.',
  },
];

export const FAQ_ITEMS = FAQS_DATA;

// Initial seeded customer orders for testing and demonstration
export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'BT-000125',
    serviceType: 'flight',
    serviceName: 'Flight Ticket',
    customerName: 'Mohamed Hassan',
    phone: '612483838',
    email: 'mohamed.h@example.com',
    status: 'Processing',
    createdAt: '2026-09-15T09:30:00Z',
    lastUpdated: '2026-09-17T06:15:00Z',
    destinationSummary: 'Mogadishu → Dubai (Round Trip, 2 Passengers, Economy)',
    travelDateSummary: 'Dep: 2026-10-05 | Ret: 2026-10-18',
    notesToCustomer: 'Our ticketing desk is comparing Qatar Airways and Flydubai options. An agent will send flight times via WhatsApp shortly.',
  },
  {
    id: 'BT-000128',
    serviceType: 'umrah-hajj',
    serviceName: 'Umrah & Hajj',
    customerName: 'Fatima Abdi',
    phone: '612141414',
    email: 'fatima.abdi@example.com',
    status: 'Confirmed',
    createdAt: '2026-09-10T11:20:00Z',
    lastUpdated: '2026-09-16T14:40:00Z',
    destinationSummary: 'Makkah & Madinah Spiritual Package (4 Travelers)',
    travelDateSummary: 'Preferred Travel: November 2026',
    notesToCustomer: 'Package itinerary confirmed. Hotel reservations close to Haram secured. Visa documents ready for processing.',
  },
];
