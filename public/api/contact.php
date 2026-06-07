<?php
/**
 * API contact — EFFECTIVE'PLOMBERIE (Hostinger / PHP mail)
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
$rateLimitKey = "rate_limit_contact_$ip";

if (!isset($_SESSION[$rateLimitKey])) {
  $_SESSION[$rateLimitKey] = ['count' => 0, 'reset' => time() + 60];
}
if ($_SESSION[$rateLimitKey]['reset'] < time()) {
  $_SESSION[$rateLimitKey] = ['count' => 0, 'reset' => time() + 60];
}
if ($_SESSION[$rateLimitKey]['count'] >= 5) {
  http_response_code(429);
  echo json_encode(['error' => 'Trop de requêtes. Veuillez réessayer dans quelques instants.']);
  exit;
}
$_SESSION[$rateLimitKey]['count']++;

$raw = file_get_contents('php://input');
$json = null;
$contentType = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false && !empty($raw)) {
  $json = json_decode($raw, true);
}

$name = '';
$email = '';
$phone = '';
$subject = '';
$message = '';

if (is_array($json)) {
  $name = trim($json['name'] ?? '');
  $email = $json['email'] ?? '';
  $phone = trim($json['phone'] ?? '');
  $subject = $json['subject'] ?? '';
  $message = trim($json['message'] ?? '');
} else {
  $name = trim($_POST['name'] ?? $_POST['nom'] ?? '');
  $email = $_POST['email'] ?? '';
  $phone = trim($_POST['phone'] ?? $_POST['telephone'] ?? '');
  $subject = $_POST['subject'] ?? $_POST['sujet'] ?? '';
  $message = trim($_POST['message'] ?? '');
}

$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

if (empty($name) || empty($email) || empty($phone) || empty($message)) {
  http_response_code(400);
  echo json_encode(['error' => 'Tous les champs obligatoires doivent être remplis']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['error' => 'Adresse e-mail invalide']);
  exit;
}

if (strlen($name) > 100 || strlen($email) > 150 || strlen($message) > 5000) {
  http_response_code(413);
  echo json_encode(['error' => 'Données trop volumineuses']);
  exit;
}

if (!preg_match('/^[0-9+\s\-\(\)]{10,20}$/', $phone)) {
  http_response_code(400);
  echo json_encode(['error' => 'Format de téléphone invalide']);
  exit;
}

$subjectMap = [
  'depannage' => 'Dépannage urgent',
  'renovation' => 'Projet de rénovation',
  'partenaire' => 'Partenariat / Architecte',
  'recrutement' => 'Recrutement',
  'autre' => 'Autre demande',
];
$subjectText = $subjectMap[$subject] ?? htmlspecialchars(trim($subject), ENT_QUOTES, 'UTF-8');
if (empty($subjectText)) {
  $subjectText = 'Nouvelle demande de contact';
}

$to = $config['CONTACT_EMAIL'];
$siteName = $config['SITE_NAME'];
$from = $config['SMTP_FROM'];

$emailSubject = "$siteName — Contact — $subjectText";
$htmlBody = mail_build_contact_html($config, [
  'name' => $name,
  'email' => $email,
  'phone' => $phone,
  'subjectText' => $subjectText,
  'message' => $message,
  'ip' => $ip,
]);

$mailSent = mail_send_html($to, $emailSubject, $htmlBody, $siteName, $from, $name, $email);

if ($mailSent) {
  mail_respond_success('Message envoyé avec succès !');
} else {
  mail_respond_error(500, "Erreur lors de l'envoi du message. Veuillez réessayer ou nous appeler.");
}
