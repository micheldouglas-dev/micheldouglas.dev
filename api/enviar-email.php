<?php
/**
 * API de Envio de Email - MichelDouglas.dev
 * Processa formulário de contato e envia via SMTP
 */

// Carrega PHPMailer e Template
require_once 'PHPMailer/src/PHPMailer.php';
require_once 'PHPMailer/src/SMTP.php';
require_once 'PHPMailer/src/Exception.php';
require_once 'templates/email-template.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Headers para JSON
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
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

// Verifica se é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Método não permitido. Use POST.', 405);
}

// ========== RECEBE E SANITIZA DADOS ==========
$nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_SPECIAL_CHARS);
$assunto = filter_input(INPUT_POST, 'assunto', FILTER_SANITIZE_SPECIAL_CHARS);
$mensagem = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_SPECIAL_CHARS);
$captcha = filter_input(INPUT_POST, 'captcha', FILTER_VALIDATE_INT);
$captchaResposta = filter_input(INPUT_POST, 'captchaResposta', FILTER_VALIDATE_INT);

// ========== VALIDAÇÕES ==========

// Campos obrigatórios
if (empty($nome) || empty($email) || empty($mensagem)) {
    sendResponse(false, 'Por favor, preencha todos os campos obrigatórios.', 400);
}

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Email inválido. Verifique e tente novamente.', 400);
}

// Validar nome (mínimo 3 caracteres)
if (strlen($nome) < 3) {
    sendResponse(false, 'Nome deve ter pelo menos 3 caracteres.', 400);
}

// Validar mensagem (mínimo 10 caracteres)
if (strlen($mensagem) < 10) {
    sendResponse(false, 'Mensagem deve ter pelo menos 10 caracteres.', 400);
}

// Validar CAPTCHA
if ($captcha !== $captchaResposta) {
    sendResponse(false, 'CAPTCHA incorreto. Tente novamente.', 400);
}

// Se assunto vazio, define padrão
if (empty($assunto)) {
    $assunto = 'Contato via Site';
}

// ========== CONFIGURAÇÃO DE EMAIL ==========
// Credenciais carregadas de config.php (fora do controle de versão)
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
    // ========== Configurações do Servidor SMTP ==========
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_user'];
    $mail->Password = $config['smtp_pass'];
    $mail->SMTPSecure = $config['smtp_secure'];
    $mail->Port = $config['smtp_port'];
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    
    // Debug (desative em produção)
    // $mail->SMTPDebug = 2; // 0 = off, 1 = client, 2 = client and server
    
    // ========== Remetente e Destinatário ==========
    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email'], $config['to_name']);
    $mail->addReplyTo($email, $nome);
    
    // ========== Conteúdo do Email ==========
    $mail->isHTML(true);
    $mail->Subject = "✦ Nova Mensagem: {$assunto}";
    
    // Usa o template profissional
    $mail->Body = getEmailTemplate($nome, $email, $telefone, $assunto, $mensagem);
    
    // Versão texto plano (fallback)
    $mail->AltBody = "Nova mensagem de contato\n\n" .
                     "Nome: {$nome}\n" .
                     "Email: {$email}\n" .
                     ($telefone ? "Telefone: {$telefone}\n" : "") .
                     "Assunto: {$assunto}\n\n" .
                     "Mensagem:\n{$mensagem}\n\n" .
                     "---\n" .
                     "Enviado via micheldouglas.dev";
    
    // ========== ENVIA ==========
    $mail->send();
    
    // Sucesso!
    sendResponse(true, 'Mensagem enviada com sucesso! Retornarei em breve.', 200);
    
} catch (Exception $e) {
    // Log do erro (em produção, salve em arquivo)
    error_log("Erro ao enviar email: {$mail->ErrorInfo}");
    
    // Resposta genérica (não expõe detalhes do erro ao usuário)
    sendResponse(false, 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.', 500);
}
?>