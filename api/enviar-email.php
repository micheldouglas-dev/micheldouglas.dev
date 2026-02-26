<?php
/**
 * API de Envio de Email - MichelDouglas.dev
 * Processa formulário de contato e envia via SMTP
 */

session_start();

// Carrega PHPMailer e Template
require_once 'PHPMailer/src/PHPMailer.php';
require_once 'PHPMailer/src/SMTP.php';
require_once 'PHPMailer/src/Exception.php';
require_once 'templates/email-template.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Headers para JSON
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: https://micheldouglas.dev');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Função de resposta
function sendResponse($success, $message, $code = 200) {
    http_response_code($code);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Rate limiting: máx 5 envios por IP por hora
function checkRateLimit($maxRequests = 5, $windowSeconds = 3600) {
    $ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $file = sys_get_temp_dir() . '/rl_' . md5($ip) . '.json';
    $now  = time();
    $requests = [];

    if (file_exists($file)) {
        $data = json_decode(@file_get_contents($file), true);
        if (is_array($data)) {
            $requests = array_values(array_filter($data, fn($t) => ($now - $t) < $windowSeconds));
        }
    }

    if (count($requests) >= $maxRequests) {
        return false;
    }

    $requests[] = $now;
    @file_put_contents($file, json_encode($requests), LOCK_EX);
    return true;
}

// Verifica se é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Método não permitido. Use POST.', 405);
}

// Rate limit
if (!checkRateLimit()) {
    sendResponse(false, 'Muitas tentativas. Aguarde antes de tentar novamente.', 429);
}

// Valida CSRF token
$csrfToken = isset($_POST['csrf_token']) ? trim($_POST['csrf_token']) : '';
if (
    empty($csrfToken) ||
    empty($_SESSION['csrf_token']) ||
    !hash_equals($_SESSION['csrf_token'], $csrfToken) ||
    (time() - ($_SESSION['csrf_token_time'] ?? 0)) > 7200
) {
    sendResponse(false, 'Token de segurança inválido. Recarregue a página e tente novamente.', 403);
}
unset($_SESSION['csrf_token'], $_SESSION['csrf_token_time']);

// ========== RECEBE E SANITIZA DADOS ==========
$nome      = trim(filter_input(INPUT_POST, 'nome',      FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$email     = trim(filter_input(INPUT_POST, 'email',     FILTER_SANITIZE_EMAIL)         ?? '');
$whatsapp  = trim(filter_input(INPUT_POST, 'whatsapp',  FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$descricao = trim(filter_input(INPUT_POST, 'descricao', FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$origem    = trim(filter_input(INPUT_POST, 'origem',    FILTER_SANITIZE_SPECIAL_CHARS) ?? '');
$captchaInput = filter_input(INPUT_POST, 'captcha', FILTER_VALIDATE_INT);

// Sanitiza array de serviços
$servicos = [];
if (isset($_POST['servicos']) && is_array($_POST['servicos'])) {
    foreach ($_POST['servicos'] as $s) {
        $clean = htmlspecialchars(strip_tags(trim((string)$s)), ENT_QUOTES, 'UTF-8');
        if (!empty($clean) && strlen($clean) <= 100) {
            $servicos[] = $clean;
        }
    }
}

// ========== VALIDAÇÕES ==========

// Campos obrigatórios
if (empty($nome) || empty($email) || empty($descricao)) {
    sendResponse(false, 'Por favor, preencha todos os campos obrigatórios.', 400);
}

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    sendResponse(false, 'Email inválido. Verifique e tente novamente.', 400);
}

// Validar nome (3–100 caracteres)
if (strlen($nome) < 3 || strlen($nome) > 100) {
    sendResponse(false, 'Nome deve ter entre 3 e 100 caracteres.', 400);
}

// Validar mensagem (10–5000 caracteres)
if (strlen($descricao) < 10 || strlen($descricao) > 5000) {
    sendResponse(false, 'Mensagem deve ter entre 10 e 5000 caracteres.', 400);
}

// Validar WhatsApp (formato brasileiro: (XX) X XXXX-XXXX)
if (!empty($whatsapp) && !preg_match('/^\(\d{2}\) \d \d{4}-\d{4}$/', $whatsapp)) {
    sendResponse(false, 'WhatsApp inválido. Use o formato (DDD) 9 9999-9999.', 400);
}

// Validar serviços
if (empty($servicos)) {
    sendResponse(false, 'Selecione pelo menos um serviço.', 400);
}

// Valida CAPTCHA via sessão (server-side)
if (
    !isset($_SESSION['captcha_answer'], $_SESSION['captcha_time']) ||
    (time() - $_SESSION['captcha_time']) > 1800
) {
    unset($_SESSION['captcha_answer'], $_SESSION['captcha_time']);
    sendResponse(false, 'CAPTCHA expirado. Recarregue a página e tente novamente.', 400);
}

if ($captchaInput === false || $captchaInput === null || $captchaInput !== (int) $_SESSION['captcha_answer']) {
    unset($_SESSION['captcha_answer'], $_SESSION['captcha_time']);
    sendResponse(false, 'CAPTCHA incorreto. Tente novamente.', 400);
}
unset($_SESSION['captcha_answer'], $_SESSION['captcha_time']);

// Assunto derivado dos serviços
$assunto = !empty($servicos) ? $servicos[0] : 'Contato via Site';

// ========== CONFIGURAÇÃO DE EMAIL ==========
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    error_log('config.php não encontrado. Copie config.example.php e preencha as credenciais.');
    sendResponse(false, 'Erro de configuração do servidor.', 500);
}
$config = require $configFile;
$config['smtp_secure'] = PHPMailer::ENCRYPTION_SMTPS;

// ========== ENVIO DO EMAIL ==========
$mail = new PHPMailer(true);

try {
    // Configurações do Servidor SMTP
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_user'];
    $mail->Password   = $config['smtp_pass'];
    $mail->SMTPSecure = $config['smtp_secure'];
    $mail->Port       = $config['smtp_port'];
    $mail->CharSet    = 'UTF-8';
    $mail->Encoding   = 'base64';

    // Remetente e Destinatário
    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email'], $config['to_name']);
    $mail->addReplyTo($email, $nome);

    // Conteúdo do Email
    $mail->isHTML(true);
    $mail->Subject = "✦ Nova Mensagem: {$assunto}";
    $mail->Body    = getEmailTemplate($nome, $email, $whatsapp, $servicos, $origem, $descricao);

    // Versão texto plano (fallback)
    $servicosTexto = implode(', ', $servicos);
    $mail->AltBody = "Nova mensagem de contato\n\n" .
                     "Nome: {$nome}\n" .
                     "Email: {$email}\n" .
                     ($whatsapp  ? "WhatsApp: {$whatsapp}\n"      : '') .
                     "Serviços: {$servicosTexto}\n" .
                     ($origem    ? "Como conheceu: {$origem}\n"   : '') .
                     "\nMensagem:\n{$descricao}\n\n" .
                     "---\n" .
                     "Enviado via micheldouglas.dev";

    $mail->send();

    sendResponse(true, 'Mensagem enviada com sucesso! Retornarei em breve.', 200);

} catch (Exception $e) {
    error_log("Erro ao enviar email: {$mail->ErrorInfo}");
    sendResponse(false, 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.', 500);
}
