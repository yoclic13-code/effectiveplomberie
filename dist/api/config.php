<?php
/**
 * Configuration e-mail — Hostinger
 */
return [
  'CONTACT_EMAIL' => getenv('CONTACT_EMAIL') ?: 'effective.plomberie@gmail.com',
  'SMTP_FROM' => getenv('SMTP_FROM') ?: 'contact@effective-plomberie.fr',
  'SITE_NAME' => "EFFECTIVE'PLOMBERIE",
  'SITE_URL' => getenv('SITE_URL') ?: 'https://www.effective-plomberie.fr',
  'PHONE' => getenv('BRAND_PHONE') ?: '06 29 11 70 69',
  'PHONE_TEL' => getenv('BRAND_PHONE_TEL') ?: '+33629117069',
];
