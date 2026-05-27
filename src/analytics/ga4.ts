function gtag(...args: unknown[]): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function trackPageView(params: {
  page_path: string;
  page_title: string;
  page_location?: string;
}) {
  gtag('event', 'page_view', {
    page_path: params.page_path,
    page_title: params.page_title,
    page_location: params.page_location ?? window.location.href,
    ...(GA_ID ? { send_to: GA_ID } : {}),
  });
}

export function trackDevisSubmit(params: {
  service_type: string;
  urgency: 'standard' | 'urgent' | 'tres_urgent';
  estimated_range?: string;
  zone?: string;
}) {
  gtag('event', 'devis_submit', {
    event_category: 'Conversion',
    event_label: `${params.service_type} — ${params.urgency}`,
    service_type: params.service_type,
    urgency: params.urgency,
    estimated_range: params.estimated_range,
    zone: params.zone,
    value: 1,
  });

  gtag('event', 'generate_lead', {
    currency: 'EUR',
    value: 0,
    lead_source: 'website_form',
    form_name: 'devis',
  });
}

export function trackContactSubmit(params: { subject: string }) {
  gtag('event', 'contact_submit', {
    event_category: 'Conversion',
    event_label: params.subject,
    form_name: 'contact',
    subject: params.subject,
    value: 1,
  });

  gtag('event', 'generate_lead', {
    currency: 'EUR',
    value: 0,
    lead_source: 'website_form',
    form_name: 'contact',
  });
}

export function trackProjetSubmit(params: {
  project_type: string;
  timeline?: string;
}) {
  gtag('event', 'projet_submit', {
    event_category: 'Conversion',
    event_label: params.project_type,
    form_name: 'projet_pro',
    project_type: params.project_type,
    timeline: params.timeline,
    value: 1,
  });

  gtag('event', 'generate_lead', {
    currency: 'EUR',
    value: 0,
    lead_source: 'website_form',
    form_name: 'projet_pro',
  });
}

export function trackPhoneCall(params: {
  location: 'header' | 'footer' | 'hero' | 'urgency_bar' | 'contact_page' | 'cta';
  phone_number?: string;
}) {
  const phone = params.phone_number ?? '33629117069';
  gtag('event', 'phone_call_click', {
    event_category: 'Contact',
    event_label: params.location,
    phone_location: params.location,
    phone_number: phone,
    value: 1,
  });

  gtag('event', 'click', {
    link_classes: 'tel-link',
    link_url: `tel:${phone}`,
    outbound: false,
  });
}

export function trackServiceView(params: {
  service_name: string;
  action: 'expand' | 'cta_devis' | 'cta_contact';
}) {
  gtag('event', 'service_interaction', {
    event_category: 'Engagement',
    event_label: `${params.service_name} — ${params.action}`,
    service_name: params.service_name,
    interaction_type: params.action,
  });
}

export function trackGalleryFilter(params: {
  filter: 'tous' | 'renovation' | 'chauffage' | 'depannage';
}) {
  gtag('event', 'gallery_filter', {
    event_category: 'Engagement',
    event_label: params.filter,
    filter_value: params.filter,
  });
}

export function trackDevisCTAClick(params: {
  source_page: string;
  cta_label: string;
}) {
  gtag('event', 'devis_cta_click', {
    event_category: 'Navigation',
    event_label: `${params.source_page} → devis`,
    source_page: params.source_page,
    cta_label: params.cta_label,
  });
}

export function trackScrollDepth(params: { depth: 25 | 50 | 75 | 100; page: string }) {
  gtag('event', 'scroll_depth', {
    event_category: 'Engagement',
    percent_scrolled: params.depth,
    page_path: params.page,
  });
}

export function trackFormStart(params: { form_name: 'contact' | 'devis' | 'projet' }) {
  gtag('event', 'form_start', {
    event_category: 'Form',
    form_name: params.form_name,
  });
}

export function trackFormError(params: {
  form_name: string;
  field_name: string;
  error_type: string;
}) {
  gtag('event', 'form_error', {
    event_category: 'Form',
    form_name: params.form_name,
    field_name: params.field_name,
    error_type: params.error_type,
  });
}

export function trackWebVital(params: {
  name: 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}) {
  gtag('event', params.name, {
    event_category: 'Web Vitals',
    event_label: params.id,
    value: Math.round(params.name === 'CLS' ? params.delta * 1000 : params.delta),
    metric_rating: params.rating,
    metric_value: params.value,
    non_interaction: true,
  });
}

export function mapDevisUrgency(
  urgency: 'faible' | 'moyen' | 'urgent' | 'critique',
): 'standard' | 'urgent' | 'tres_urgent' {
  if (urgency === 'urgent') return 'urgent';
  if (urgency === 'critique') return 'tres_urgent';
  return 'standard';
}

export function detectZoneFromAddress(address: string): string {
  const a = address.toLowerCase();
  if (a.includes('marseille')) return 'marseille';
  if (a.includes('aix')) return 'aix-en-provence';
  return 'autre-13';
}
