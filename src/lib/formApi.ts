const CONTACT_API = '/api/contact.php';
const DEVIS_API = '/api/devis.php';

export async function submitContactForm(payload: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<string> {
  const response = await fetch(CONTACT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || result.message || "Erreur lors de l'envoi du message");
  }

  return result.message || 'Message envoyé avec succès !';
}

export async function submitDevisForm(payload: {
  clientName: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  urgency: string;
  details: string;
  approximateDate: string;
}): Promise<string> {
  const response = await fetch(DEVIS_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || result.message || "Erreur lors de l'envoi de la demande");
  }

  return result.message || 'Demande de devis envoyée avec succès !';
}
