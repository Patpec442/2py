<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$config = [
    'to' => getenv('TWOPY_CONTACT_TO') ?: 'contact@2py.fr',
    'from' => getenv('TWOPY_CONTACT_FROM') ?: 'no-reply@2py.fr',
    'subject_prefix' => getenv('TWOPY_CONTACT_SUBJECT_PREFIX') ?: '[2PY] Demande de contact',
];

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'message' => 'Méthode non autorisée.']);
}

$honeypot = trim((string)($_POST['website'] ?? ''));
if ($honeypot !== '') {
    respond(200, ['ok' => true, 'message' => 'Votre demande a bien été transmise.']);
}

$name = trim((string)($_POST['nom'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$company = trim((string)($_POST['societe'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$consent = (string)($_POST['consentement'] ?? '');

if ($name === '' || $email === '' || $company === '' || $message === '') {
    respond(422, ['ok' => false, 'message' => 'Merci de compléter tous les champs obligatoires.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'message' => 'Merci d’indiquer une adresse email valide.']);
}

if ($consent !== '1') {
    respond(422, ['ok' => false, 'message' => 'Le consentement est nécessaire pour être recontacté.']);
}

$clean = static fn(string $value): string => trim(str_replace(["\r", "\n"], ' ', $value));
$subject = $config['subject_prefix'] . ' - ' . $clean($company);
$body = implode("\n", [
    'Nouvelle demande depuis le site 2PY',
    '',
    'Nom : ' . $name,
    'Email : ' . $email,
    'Société : ' . $company,
    'Consentement : oui',
    '',
    'Message :',
    $message,
    '',
    'IP : ' . ($_SERVER['REMOTE_ADDR'] ?? 'non disponible'),
    'User-Agent : ' . ($_SERVER['HTTP_USER_AGENT'] ?? 'non disponible'),
]);

$headers = [
    'From: 2PY <' . $config['from'] . '>',
    'Reply-To: ' . $clean($name) . ' <' . $clean($email) . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = mail($config['to'], $subject, $body, implode("\r\n", $headers));
if (!$sent) {
    error_log('2PY contact mail() failed for ' . $email);
    respond(500, ['ok' => false, 'message' => 'Envoi indisponible. Vous pouvez écrire à contact@2py.fr.']);
}

respond(200, ['ok' => true, 'message' => 'Votre demande a bien été transmise.']);
