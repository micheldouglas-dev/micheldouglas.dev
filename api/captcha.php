<?php
/**
 * captcha.php — Gera CAPTCHA matemático e token CSRF via sessão.
 * Chamado pelo frontend ao carregar o formulário de contato.
 */

session_start();

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: https://micheldouglas.dev');
header('Access-Control-Allow-Methods: GET');
header('Cache-Control: no-store, no-cache, must-revalidate');

// Gera CAPTCHA matemático simples (resultado sempre positivo)
$num1 = random_int(1, 20);
$num2 = random_int(1, 20);

if (random_int(0, 1)) {
    $question = "$num1 + $num2";
    $answer   = $num1 + $num2;
} else {
    [$big, $small] = $num1 >= $num2 ? [$num1, $num2] : [$num2, $num1];
    $question = "$big - $small";
    $answer   = $big - $small;
}

$_SESSION['captcha_answer'] = $answer;
$_SESSION['captcha_time']   = time();

// Gera token CSRF
$csrfToken = bin2hex(random_bytes(32));
$_SESSION['csrf_token']      = $csrfToken;
$_SESSION['csrf_token_time'] = time();

echo json_encode([
    'question'   => $question,
    'csrf_token' => $csrfToken,
], JSON_UNESCAPED_UNICODE);
