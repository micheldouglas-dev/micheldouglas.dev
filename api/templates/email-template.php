<?php
function getEmailTemplate($nome, $email, $telefone, $assunto, $mensagem) {
    return '
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Mensagem - MichelDouglas.dev</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        
        .email-header {
            background: linear-gradient(135deg, #F11348 0%, #EF7D06 100%);
            padding: 40px 30px;
            text-align: center;
        }
        
        .email-header img {
            max-width: 180px;
            height: auto;
            margin-bottom: 20px;
        }
        
        .email-header h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
        }
        
        .email-header p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            margin-top: 10px;
        }
        
        .email-body {
            padding: 40px 30px;
        }
        
        .alert-box {
            background: #FFF3F0;
            border-left: 4px solid #F11348;
            padding: 16px 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        
        .alert-box p {
            color: #F11348;
            font-weight: 600;
            font-size: 14px;
            margin: 0;
        }
        
        .info-grid {
            display: grid;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .info-item {
            background: #F8F9FA;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #E5E7EB;
        }
        
        .info-label {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #F11348;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }
        
        .info-label svg {
            width: 16px;
            height: 16px;
            fill: #F11348;
        }
        
        .info-value {
            color: #1F2937;
            font-size: 16px;
            font-weight: 500;
        }
        
        .message-box {
            background: #F8F9FA;
            padding: 24px;
            border-radius: 12px;
            border: 1px solid #E5E7EB;
            margin-top: 30px;
        }
        
        .message-label {
            color: #F11348;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
            display: block;
        }
        
        .message-content {
            color: #374151;
            font-size: 15px;
            line-height: 1.8;
            white-space: pre-wrap;
        }
        
        .email-footer {
            background: #1F2937;
            padding: 30px;
            text-align: center;
        }
        
        .footer-text {
            color: #9CA3AF;
            font-size: 14px;
            margin: 0;
        }
        
        .footer-brand {
            color: #F11348;
            font-weight: 700;
            text-decoration: none;
        }
        
        .divider {
            height: 1px;
            background: #E5E7EB;
            margin: 30px 0;
        }
        
        @media only screen and (max-width: 600px) {
            .email-header {
                padding: 30px 20px;
            }
            
            .email-header h1 {
                font-size: 24px;
            }
            
            .email-body {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>✦ Nova Mensagem Recebida</h1>
            <p>Alguém entrou em contato pelo seu site</p>
        </div>
        
        <!-- Body -->
        <div class="email-body">
            <!-- Alert -->
            <div class="alert-box">
                <p>⚡ Você recebeu uma nova mensagem de contato!</p>
            </div>
            
            <!-- Info Grid -->
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Nome Completo
                    </span>
                    <div class="info-value">' . htmlspecialchars($nome) . '</div>
                </div>
                
                <div class="info-item">
                    <span class="info-label">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        Email
                    </span>
                    <div class="info-value">
                        <a href="mailto:' . htmlspecialchars($email) . '" style="color: #F11348; text-decoration: none;">
                            ' . htmlspecialchars($email) . '
                        </a>
                    </div>
                </div>
                
                ' . ($telefone ? '
                <div class="info-item">
                    <span class="info-label">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        Telefone
                    </span>
                    <div class="info-value">
                        <a href="tel:' . htmlspecialchars($telefone) . '" style="color: #F11348; text-decoration: none;">
                            ' . htmlspecialchars($telefone) . '
                        </a>
                    </div>
                </div>
                ' : '') . '
                
                <div class="info-item">
                    <span class="info-label">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                        </svg>
                        Assunto
                    </span>
                    <div class="info-value">' . htmlspecialchars($assunto) . '</div>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <!-- Message -->
            <div class="message-box">
                <span class="message-label">📝 Mensagem</span>
                <div class="message-content">' . nl2br(htmlspecialchars($mensagem)) . '</div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
            <p class="footer-text">
                Este email foi enviado automaticamente via formulário de contato do site<br>
                <a href="https://micheldouglas.dev" class="footer-brand">MichelDouglas.dev</a>
            </p>
        </div>
    </div>
</body>
</html>
    ';
}
?>