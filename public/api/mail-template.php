<?php
/**
 * Templates e-mail HTML premium — EFFECTIVE'PLOMBERIE
 * Compatible clients mail (styles inline, tables).
 */

function mail_is_local(): bool
{
  $host = $_SERVER['HTTP_HOST'] ?? '';
  return in_array($host, ['localhost', '127.0.0.1'], true) ||
    stripos($host, 'localhost') !== false ||
    stripos($host, '.local') !== false;
}

function mail_send_html(
  string $to,
  string $subject,
  string $htmlBody,
  string $fromName,
  string $fromEmail,
  string $replyName,
  string $replyEmail
): bool {
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
  $headers .= "From: $fromName <$fromEmail>\r\n";
  $headers .= "Reply-To: $replyName <$replyEmail>\r\n";
  $headers .= "X-Mailer: EFFECTIVE-Plomberie-Forms\r\n";

  return @mail($to, $subject, $htmlBody, $headers);
}

function mail_row(string $label, string $value, bool $isLink = false): string
{
  $display = $isLink ? $value : htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
  return '
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;width:38%;vertical-align:top;">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;">'
          . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') .
        '</span>
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;vertical-align:top;">
        <span style="font-size:14px;color:#0f172a;font-weight:600;line-height:1.5;">' . $display . '</span>
      </td>
    </tr>';
}

function mail_badge(string $text, string $bg, string $color): string
{
  return '<span style="display:inline-block;background:' . $bg . ';color:' . $color .
    ';font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;' .
    'padding:6px 12px;border-radius:999px;">' .
    htmlspecialchars($text, ENT_QUOTES, 'UTF-8') . '</span>';
}

function mail_urgency_badge(string $urgency): string
{
  $map = [
    'Faible' => ['#f1f5f9', '#475569'],
    'Moyen' => ['#eff6ff', '#1d4ed8'],
    'Urgent' => ['#fff7ed', '#c2410c'],
    'Critique' => ['#fef2f2', '#b91c1c'],
  ];
  [$bg, $color] = $map[$urgency] ?? ['#f1f5f9', '#475569'];
  return mail_badge($urgency, $bg, $color);
}

function mail_wrap(array $config, string $typeLabel, string $typeBadgeBg, string $title, string $innerHtml, string $ip): string
{
  $siteName = htmlspecialchars($config['SITE_NAME'], ENT_QUOTES, 'UTF-8');
  $siteUrl = htmlspecialchars($config['SITE_URL'], ENT_QUOTES, 'UTF-8');
  $phone = htmlspecialchars($config['PHONE'], ENT_QUOTES, 'UTF-8');
  $phoneTel = preg_replace('/\s+/', '', $config['PHONE_TEL'] ?? $config['PHONE']);
  $date = date('d/m/Y à H:i');

  return '<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1d4ed8 0%,#2563eb 50%,#3b82f6 100%);padding:28px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.75);">'
                    . htmlspecialchars($typeLabel, ENT_QUOTES, 'UTF-8') .
                  '</p>
                  <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.3;">' . $siteName . '</h1>
                  <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.9);">Plombier certifié RGE — Aix-en-Provence &amp; Marseille</p>
                </td>
                <td align="right" valign="top" style="white-space:nowrap;">
                  ' . mail_badge($typeLabel, $typeBadgeBg, '#ffffff') . '
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Title band -->
        <tr>
          <td style="padding:24px 32px 8px;">
            <h2 style="margin:0;font-size:18px;font-weight:700;color:#0f172a;">' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</h2>
            <p style="margin:6px 0 0;font-size:13px;color:#64748b;">Reçu le ' . $date . '</p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:8px 32px 24px;">
            ' . $innerHtml . '
          </td>
        </tr>

        <!-- Quick actions -->
        <tr>
          <td style="padding:0 32px 28px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:8px;width:50%;">
                  <a href="tel:' . htmlspecialchars($phoneTel, ENT_QUOTES, 'UTF-8') . '" style="display:block;text-align:center;background:#2563eb;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 16px;border-radius:10px;">📞 Appeler le client</a>
                </td>
                <td style="padding-left:8px;width:50%;">
                  <a href="' . $siteUrl . '/devis" style="display:block;text-align:center;background:#f1f5f9;color:#1d4ed8;text-decoration:none;font-size:13px;font-weight:700;padding:12px 16px;border-radius:10px;border:1px solid #e2e8f0;">🌐 Voir le site</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;">
            <p style="margin:0 0 4px;font-size:11px;color:#94a3b8;text-align:center;">
              Message automatique — formulaire ' . $siteUrl . '
            </p>
            <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;">
              Siège : Aix-en-Provence (13100) · Tél. artisan : ' . $phone . ' · IP visiteur : ' . htmlspecialchars($ip, ENT_QUOTES, 'UTF-8') . '
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>';
}

function mail_build_contact_html(array $config, array $data): string
{
  $name = $data['name'];
  $email = $data['email'];
  $phone = $data['phone'];
  $subjectText = $data['subjectText'];
  $message = $data['message'];
  $ip = $data['ip'];

  $messageHtml = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

  $table = '
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;">
      ' . mail_row('Nom complet', $name) . '
      ' . mail_row('E-mail', '<a href="mailto:' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '" style="color:#2563eb;text-decoration:none;">' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</a>', true) . '
      ' . mail_row('Téléphone', '<a href="tel:' . preg_replace('/\s+/', '', $phone) . '" style="color:#2563eb;text-decoration:none;">' . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . '</a>', true) . '
      ' . mail_row('Objet', $subjectText) . '
    </table>

    <div style="margin-top:20px;padding:20px;background:#f8fafc;border-left:4px solid #2563eb;border-radius:0 12px 12px 0;">
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;">Message du client</p>
      <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">' . $messageHtml . '</p>
    </div>';

  return mail_wrap($config, 'Contact', '#059669', 'Nouveau message de contact', $table, $ip);
}

function mail_build_devis_html(array $config, array $data): string
{
  $clientName = $data['clientName'];
  $email = $data['email'];
  $phone = $data['phone'];
  $address = $data['address'];
  $serviceText = $data['serviceText'];
  $urgencyText = $data['urgencyText'];
  $approximateDate = $data['approximateDate'];
  $details = $data['details'];
  $ip = $data['ip'];

  $detailsHtml = $details !== ''
    ? nl2br(htmlspecialchars($details, ENT_QUOTES, 'UTF-8'))
    : '<em style="color:#94a3b8;">Non renseignée</em>';

  $urgencyBadge = mail_urgency_badge($urgencyText);

  $table = '
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td style="padding:16px;background:#eff6ff;border-radius:12px;border:1px solid #bfdbfe;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#1d4ed8;">Prestation demandée</p>
          <p style="margin:0;font-size:16px;font-weight:800;color:#1e3a8a;">' . htmlspecialchars($serviceText, ENT_QUOTES, 'UTF-8') . '</p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;">
      ' . mail_row('Client', $clientName) . '
      ' . mail_row('E-mail', '<a href="mailto:' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '" style="color:#2563eb;text-decoration:none;">' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</a>', true) . '
      ' . mail_row('Téléphone', '<a href="tel:' . preg_replace('/\s+/', '', $phone) . '" style="color:#2563eb;text-decoration:none;">' . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . '</a>', true) . '
      ' . mail_row('Adresse chantier', $address) . '
      ' . mail_row('Urgence', $urgencyBadge, true) . '
      ' . mail_row('Date souhaitée', $approximateDate) . '
    </table>

    <div style="margin-top:20px;padding:20px;background:#f0fdf4;border-left:4px solid #059669;border-radius:0 12px 12px 0;">
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;">Description du besoin</p>
      <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">' . $detailsHtml . '</p>
    </div>

    <div style="margin-top:16px;padding:14px 16px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;">
      <p style="margin:0;font-size:12px;color:#92400e;line-height:1.5;">
        <strong>Action recommandée :</strong> recontacter le client sous 24 h ouvrées (2 h en semaine pour les urgences).
      </p>
    </div>';

  return mail_wrap($config, 'Devis', '#d97706', 'Nouvelle demande de devis gratuit', $table, $ip);
}

function mail_respond_success(string $message): void
{
  echo json_encode(['message' => $message]);
}

function mail_respond_error(int $code, string $error, string $localSuccessMessage = 'Envoyé avec succès ! (Mode test local)'): void
{
  if (mail_is_local()) {
    mail_respond_success($localSuccessMessage);
    return;
  }
  http_response_code($code);
  echo json_encode(['error' => $error]);
}
