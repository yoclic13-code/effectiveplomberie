<?php
/**
 * Configuration e-mail — Hostinger
 * Sur hPanel, vous pouvez aussi définir CONTACT_EMAIL / SMTP_FROM en variables d'environnement.
 */
return [
  'CONTACT_EMAIL' => getenv('CONTACT_EMAIL') ?: 'effective.plomberie@gmail.com',
  'SMTP_FROM' => getenv('SMTP_FROM') ?: 'contact@effective-plomberie.fr',
  'SITE_NAME' => "EFFECTIVE'PLOMBERIE",
];
