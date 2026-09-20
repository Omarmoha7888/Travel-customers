import { CustomerOrder, OrderStatusType } from '../types';
import { INITIAL_ORDERS } from './data';

export const ORDER_EXPIRATION_DAYS = 7;
export const ORDER_EXPIRATION_MS = ORDER_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

export const ORDERS_STORAGE_KEY = 'balcad_travel_customer_orders_v1';
export const LAST_REF_STORAGE_KEY = 'balcad_travel_last_ref_v1';
export const RECYCLED_IDS_STORAGE_KEY = 'balcad_travel_recycled_ids_v1';

/**
 * Checks if an order was created more than 7 days ago
 */
export function isOrderExpired(order: { createdAt: string }): boolean {
  if (!order || !order.createdAt) return false;
  const createdTime = new Date(order.createdAt).getTime();
  if (isNaN(createdTime)) return false;
  return Date.now() - createdTime > ORDER_EXPIRATION_MS;
}

/**
 * Calculates the exact expiration date 7 days after creation
 */
export function getOrderExpirationDate(createdAt: string): string {
  const createdTime = new Date(createdAt).getTime();
  if (isNaN(createdTime)) return '';
  return new Date(createdTime + ORDER_EXPIRATION_MS).toISOString();
}

/**
 * Retrieves the pool of recycled request IDs from expired orders
 */
export function getRecycledIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECYCLED_IDS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persists the pool of recycled request IDs
 */
export function saveRecycledIds(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    const unique = Array.from(new Set(ids.map((id) => id.trim().toUpperCase())));
    localStorage.setItem(RECYCLED_IDS_STORAGE_KEY, JSON.stringify(unique));
  } catch {
    // ignore
  }
}

// Helper to get all stored orders (seed + user submissions) with automatic 7-day expiration check
export function getStoredOrders(): CustomerOrder[] {
  if (typeof window === 'undefined') {
    return INITIAL_ORDERS.map((order) => {
      const expired = isOrderExpired(order);
      return {
        ...order,
        status: expired ? ('Expired' as OrderStatusType) : order.status,
        isExpired: expired,
        expiresAt: getOrderExpirationDate(order.createdAt),
      };
    });
  }

  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders: CustomerOrder[] = raw ? JSON.parse(raw) : INITIAL_ORDERS;

    const recycledQueue = getRecycledIds();
    const recycledSet = new Set(recycledQueue.map((id) => id.toUpperCase()));
    let hasChanges = false;

    const processed = orders.map((order) => {
      const expired = isOrderExpired(order);
      const expiresAt = getOrderExpirationDate(order.createdAt);

      if (expired) {
        // Collect expired ID into recycled pool so it can be reused for new requests
        if (!recycledSet.has(order.id.toUpperCase())) {
          recycledSet.add(order.id.toUpperCase());
          recycledQueue.push(order.id.toUpperCase());
          saveRecycledIds(recycledQueue);
        }
      }

      if (expired && order.status !== 'Expired') {
        hasChanges = true;
        return {
          ...order,
          status: 'Expired' as OrderStatusType,
          isExpired: true,
          expiresAt,
          notesToCustomer:
            order.notesToCustomer ||
            'Muddada 7-da maalmood ah ee codsigani shaqeynayay way dhammaatay (Expired). Request ID-gan dib ayaa loo fasaxay oo dib loogu isticmaali karaa dalabyo cusub.',
        };
      }

      return {
        ...order,
        isExpired: expired,
        expiresAt: order.expiresAt || expiresAt,
      };
    });

    if (hasChanges || !raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(processed));
    }

    return processed;
  } catch {
    return INITIAL_ORDERS.map((order) => {
      const expired = isOrderExpired(order);
      return {
        ...order,
        status: expired ? ('Expired' as OrderStatusType) : order.status,
        isExpired: expired,
        expiresAt: getOrderExpirationDate(order.createdAt),
      };
    });
  }
}

// Generate reference ID: priority given to recycled IDs from expired orders (> 7 days)
// so that request IDs continuously cycle and never halt or exhaust!
export function generateReferenceId(): string {
  if (typeof window === 'undefined') {
    return `BT-${Math.floor(100000 + Math.random() * 900000)}`;
  }
  try {
    // 1. Check for available recycled IDs from orders that passed 7 days
    const recycledQueue = getRecycledIds();

    // Also scan existing orders to detect any expired order not yet queued
    const orders = getStoredOrders();
    for (const ord of orders) {
      if (ord.isExpired && !recycledQueue.some((id) => id.toUpperCase() === ord.id.toUpperCase())) {
        recycledQueue.push(ord.id.toUpperCase());
      }
    }

    if (recycledQueue.length > 0) {
      const recycledId = recycledQueue.shift()!;
      saveRecycledIds(recycledQueue);
      return recycledId;
    }

    // 2. If no recycled IDs are available, issue next sequential number
    const lastNum = parseInt(localStorage.getItem(LAST_REF_STORAGE_KEY) || '128', 10);
    const nextNum = isNaN(lastNum) ? 129 : lastNum + 1;
    localStorage.setItem(LAST_REF_STORAGE_KEY, nextNum.toString());
    return `BT-${nextNum.toString().padStart(6, '0')}`;
  } catch {
    return `BT-${Math.floor(100000 + Math.random() * 900000)}`;
  }
}

export interface SubmitRequestResponse {
  success: boolean;
  referenceId: string;
  order: CustomerOrder;
  emailDispatchedTo: string;
  formattedEmailBody: string;
}

/**
 * Universal service submission layer.
 * Prepares the formatted email notification for balcadtravel@gmail.com
 * and stores the order in customer database for instant status lookup.
 */
export async function submitCustomerServiceRequest(data: {
  serviceType: string;
  serviceName: string;
  customerName: string;
  phone: string;
  email: string;
  details: Record<string, string | number | undefined>;
}): Promise<SubmitRequestResponse> {
  const referenceId = generateReferenceId();
  const now = new Date().toISOString();

  // Construct summary for customer tracking
  let destinationSummary = '';
  if (data.details.from && data.details.to) {
    destinationSummary = `${data.details.from} → ${data.details.to}`;
    if (data.details.passengers) destinationSummary += ` (${data.details.passengers} Passengers)`;
  } else if (data.details.destination) {
    destinationSummary = String(data.details.destination);
  } else if (data.details.destinationCountry) {
    destinationSummary = `Visa for ${data.details.destinationCountry}`;
  } else {
    destinationSummary = data.serviceName;
  }

  let travelDateSummary = '';
  if (data.details.departureDate) {
    travelDateSummary = `Departure: ${data.details.departureDate}`;
    if (data.details.returnDate) travelDateSummary += ` | Return: ${data.details.returnDate}`;
  } else if (data.details.travelDate) {
    travelDateSummary = `Date: ${data.details.travelDate}`;
  } else if (data.details.checkInDate) {
    travelDateSummary = `Check-in: ${data.details.checkInDate} | Check-out: ${data.details.checkOutDate || 'N/A'}`;
  }

  // Customer-safe order record
  const expiresAt = getOrderExpirationDate(now);
  const newOrder: CustomerOrder = {
    id: referenceId,
    serviceType: data.serviceType as any,
    serviceName: data.serviceName,
    customerName: data.customerName,
    phone: data.phone,
    email: data.email,
    status: 'New' as OrderStatusType,
    createdAt: now,
    lastUpdated: now,
    expiresAt,
    isExpired: false,
    destinationSummary,
    travelDateSummary,
    notesToCustomer: 'Thank you for your request. Our travel coordinator has received your submission and will contact you shortly.',
    documentType: data.details.documentType ? String(data.details.documentType) : undefined,
    documentNumber: data.details.documentNumber ? String(data.details.documentNumber) : undefined,
    documentExpiry: data.details.documentExpiry ? String(data.details.documentExpiry) : undefined,
    documentNationality: data.details.documentNationality ? String(data.details.documentNationality) : undefined,
    documentImageName: data.details.documentImageName ? String(data.details.documentImageName) : undefined,
    documentImageData: data.details.documentImageData ? String(data.details.documentImageData) : undefined,
  };

  // Construct official Balcad Travel email notification body
  const lines: string[] = [
    '==================================================',
    'NEW BALCAD TRAVEL SERVICE REQUEST',
    '==================================================',
    `Reference Number: ${referenceId}`,
    `Request Type:     ${data.serviceName}`,
    `Submitted At:     ${new Date().toLocaleString()}`,
    `Valid For:        7 Days (Expires: ${new Date(expiresAt).toLocaleDateString()})`,
    `ID Policy:        Request ID expires after 7 days and is recycled into the pool.`,
    '',
    'CUSTOMER DETAILS:',
    `Customer Name:    ${data.customerName}`,
    `Phone Number:     ${data.phone}`,
    `Email Address:    ${data.email}`,
    '',
    'SERVICE & TRAVEL DETAILS:',
  ];

  for (const [key, val] of Object.entries(data.details)) {
    if (val !== undefined && val !== '') {
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
      lines.push(`${formattedKey.padEnd(18)}: ${val}`);
    }
  }

  lines.push('', '==================================================');
  lines.push('Target Agency Mailbox: balcadtravel@gmail.com');
  lines.push('Balcad Travel Agency – Official Customer Portal');
  lines.push('==================================================');

  const formattedEmailBody = lines.join('\n');

  // Dispatch email notification to Balcad Travel inbox via Resend API endpoint
  const isContact = data.serviceType === 'contact' || Boolean(data.details.message);
  let resendDispatched = false;

  try {
    const appUrl = typeof window !== 'undefined' ? window.location.origin : undefined;

    const apiRes = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: isContact ? 'contact' : 'order',
        referenceId,
        serviceType: data.serviceType,
        serviceName: data.serviceName,
        customerName: data.customerName,
        phone: data.phone,
        email: data.email,
        subject: data.details.subject ? String(data.details.subject) : undefined,
        message: data.details.message ? String(data.details.message) : undefined,
        details: data.details,
        order: newOrder,
        formattedEmailBody,
        appUrl,
      }),
    });

    if (apiRes.ok) {
      const json = await apiRes.json().catch(() => null);
      if (json && json.success) {
        resendDispatched = true;
      }
    }
  } catch (err) {
    console.warn('[Email Dispatch] Non-blocking dispatch notice:', err);
  }

  // Persist locally so "Check My Order" works seamlessly right away
  if (typeof window !== 'undefined') {
    try {
      const existing = getStoredOrders();
      // If referenceId was recycled from an expired order, replace that expired record with this new active request
      const filtered = existing.filter((o) => o.id.toUpperCase() !== referenceId.toUpperCase());
      const updated = [newOrder, ...filtered];
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));

      // Remove recycled ID from queue now that it's actively allocated
      const remainingRecycled = getRecycledIds().filter((id) => id.toUpperCase() !== referenceId.toUpperCase());
      saveRecycledIds(remainingRecycled);
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }

  return {
    success: true,
    referenceId,
    order: newOrder,
    emailDispatchedTo: 'balcadtravel@gmail.com',
    formattedEmailBody,
  };
}

/**
 * Customer order verification & lookup.
 * Enforces customer privacy: requires Reference ID + matching Phone or Email.
 * Evaluates 7-day retention expiration.
 */
export async function lookupCustomerOrder(
  orderId: string,
  verificationInput: string
): Promise<{ success: boolean; found: boolean; order?: CustomerOrder; error?: string; message?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const cleanId = orderId.trim().toUpperCase();
  const cleanVerify = verificationInput.trim().toLowerCase().replace(/\s+/g, '');

  const orders = getStoredOrders();

  const matched = orders.find((o) => o.id.toUpperCase() === cleanId);

  if (!matched) {
    return {
      success: false,
      found: false,
      error: 'not_found',
      message: 'Ma jiro dalab firfircoon oo leh Reference ID-gan. Fadlan xusuusnow in dalabyada ay dhacaan (expire) 7 maalmood kadib, lambarkoodana dib loogu isticmaalo codsiyo cusub.',
    };
  }

  // Check 7-day expiration status
  const isExpired = isOrderExpired(matched) || matched.status === 'Expired';
  const expiresAt = matched.expiresAt || getOrderExpirationDate(matched.createdAt);

  // Verify Phone or Email for customer privacy protection
  const cleanOrderPhone = matched.phone.trim().toLowerCase().replace(/\D+/g, '');
  const cleanInputPhone = cleanVerify.replace(/\D+/g, '');
  const cleanOrderEmail = matched.email.trim().toLowerCase();

  const phoneMatch =
    cleanInputPhone.length >= 6 &&
    (cleanOrderPhone.includes(cleanInputPhone) || cleanInputPhone.includes(cleanOrderPhone));
  const emailMatch = cleanOrderEmail === cleanVerify;

  if (!phoneMatch && !emailMatch) {
    return {
      success: false,
      found: false,
      error: 'verification_failed',
      message: 'The phone number or email does not match the contact information on file for this order.',
    };
  }

  // Sanitize to guarantee NO staff or internal leaks
  const customerSafeOrder: CustomerOrder = {
    id: matched.id,
    serviceType: matched.serviceType,
    serviceName: matched.serviceName,
    customerName: matched.customerName,
    phone: matched.phone,
    email: matched.email,
    status: isExpired ? ('Expired' as OrderStatusType) : matched.status,
    createdAt: matched.createdAt,
    lastUpdated: matched.lastUpdated,
    expiresAt,
    isExpired,
    destinationSummary: matched.destinationSummary,
    travelDateSummary: matched.travelDateSummary,
    notesToCustomer: isExpired
      ? '⚠️ Dalabkan wuxuu dhacay (Expired) maadaama ay ka soo wareegtay 7 maalmood. Si nidaamka lambaradu uusan weligiis u istaagin, tixraacan (Request ID) dib ayaa loo fasaxay oo dib loogu isticmaali karaa dalabyo cusub. Fadlan soo gudbi dalab cusub haddii aad weli u baahan tahay safarkaaga.'
      : matched.notesToCustomer,
    customerNotes: matched.customerNotes,
    documentType: matched.documentType,
    documentNumber: matched.documentNumber,
    documentExpiry: matched.documentExpiry,
    documentNationality: matched.documentNationality,
    documentImageName: matched.documentImageName,
    documentImageData: matched.documentImageData,
  };

  return {
    success: true,
    found: true,
    order: customerSafeOrder,
    message: isExpired
      ? 'Dalabkan muddadiisii 7-da maalmood ahayd way dhammaatay (Expired). Request ID-ga dib ayaa loo isticmaalay.'
      : undefined,
  };
}
