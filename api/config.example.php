<?php
/**
 * config.example.php — Template de configuração SMTP
 * Copie este arquivo, renomeie para config.php e preencha com suas credenciais reais.
 * O arquivo config.php está no .gitignore e NUNCA deve ser commitado.
 */

return [
    'smtp_host'   => 'smtp.hostinger.com',
    'smtp_port'   => 465,
    'smtp_secure' => 'ssl',
    'smtp_user'   => 'seu-email@seudominio.com',
    'smtp_pass'   => 'SUA_SENHA_AQUI',
    'from_email'  => 'seu-email@seudominio.com',
    'from_name'   => 'Nome do Site',
    'to_email'    => 'seu-email@seudominio.com',
    'to_name'     => 'Seu Nome',
];
