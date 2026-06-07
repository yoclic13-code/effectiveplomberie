<?php
/**
 * API demande de devis — EFFECTIVE'PLOMBERIE (Hostinger / PHP mail)
 */
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Méthode non autorisée']);
  exit;
}

$config = require __DIR__ . '/config.php';
require_once __DIR__ . '/mail-template.php';

session_start();
$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$rateLimitKey = "rate_limit_devis_$ip";

if (!isset($_SESSION[$rateLimitKey])) {
  $_SESSION[$rateLimitKey] = ['count' => 0, 'reset' => time() + 60];
}
if ($_SESSION[$rateLimitKey]['reset'] < time()) {
  $_SESSION[$rateLimitKey] = ['count' => 0, 'reset' => time() + 60];
}
if ($_SESSION[$rateLimitKey]['count'] >= 3) {
  http_response_code(429);
  echo json_encode(['error' => 'Trop de requêtes. Veuillez patienter un moment.']);
  exit;
}
$_SESSION[$rateLimitKey]['count']++;

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  $data = $_POST;
}

$clientName = trim($data['clientName'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$address = trim($data['address'] ?? '');
$serviceType = trim($data['serviceType'] ?? '');
$urgency = trim($data['urgency'] ?? '');
$details = trim($data['details'] ?? '');
$approximateDate = trim($data['approximateDate'] ?? '');

if (empty($clientName) || empty($email) || empty($phone) || empty($address) || empty($serviceType)) {
  http_response_code(400);
  echo json_encode(['error' => 'Veuillez remplir tous les champs obligatoires.']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['error' => 'Adresse e-mail invalide.']);
  exit;
}

if (strlen($clientName) < 2 || strlen($clientName) > 100) {
  http_response_code(400);
  echo json_encode(['error' => 'Nom invalide.']);
  exit;
}

if (!preg_match('/^[0-9+\s\-\(\)]{10,20}$/', $phone)) {
  http_response_code(400);
  echo json_encode(['error' => 'Format de téléphone invalide.']);
  exit;
}

if (strlen($address) < 5 || strlen($address) > 300) {
  http_response_code(400);
  echo json_encode(['error' => 'Adresse invalide.']);
  exit;
}

if (strlen($details) > 5000) {
  http_response_code(413);
  echo json_encode(['error' => 'Description trop longue.']);
  exit;
}

$serviceMap = [
  'depannage' => 'Dépannage / Urgence',
  'recherche-fuite' => 'Recherche de fuite',
  'renovation' => 'Rénovation',
  'climatisation' => 'Climatisation',
  'salle-de-bain' => 'Salle de bain',
  'cuisine' => 'Cuisine',
];
$urgencyMap = [
  'faible' => 'Faible',
  'moyen' => 'Moyen',
  'urgent' => 'Urgent',
  'critique' => 'Critique',
];

if (!isset($serviceMap[$serviceType])) {
  http_response_code(400);
  echo json_encode(['error' => 'Type de prestation invalide.']);
  exit;
}

if (!empty($urgency) && !isset($urgencyMap[$urgency])) {
  http_response_code(400);
  echo json_encode(['error' => 'Niveau d\'urgence invalide.']);
  exit;
}

$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$approximateDate = !empty($approximateDate) ? $approximateDate : 'Dès que possible';

$serviceText = $serviceMap[$serviceType];
$urgencyText = !empty($urgency) ? ($urgencyMap[$urgency] ?? $urgency) : 'Non précisée';

$to = $config['CONTACT_EMAIL'];
$siteName = $config['SITE_NAME'];
$from = $config['SMTP_FROM'];

$emailSubject = "$siteName — Devis — $serviceText";
$htmlBody = mail_build_devis_html($config, [
  'clientName' => $clientName,
  'email' => $email,
  'phone' => $phone,
  'address' => $address,
  'serviceText' => $serviceText,
  'urgencyText' => $urgencyText,
  'approximateDate' => $approximateDate,
  'details' => $details,
  'ip' => $ip,
]);

$mailSent = mail_send_html($to, $emailSubject, $htmlBody, $siteName, $from, $clientName, $email);

if ($mailSent) {
  mail_respond_success('Demande de devis envoyée avec succès !');
} else {
  mail_respond_error(500, "Erreur lors de l'envoi. Veuillez réessayer ou nous appeler.");
}
