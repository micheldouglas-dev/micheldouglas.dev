<?php
function getEmailTemplate($nome, $email, $whatsapp, $servicos, $origem, $descricao) {

    /* ── Serviços como chips inline ──────────────────────────────────────── */
    $servicosHtml = '';
    foreach ($servicos as $s) {
        $servicosHtml .=
            '<span style="display:inline-block;padding:6px 14px;margin:0 6px 8px 0;'
            . 'background:rgba(241,19,72,0.09);border:1px solid rgba(241,19,72,0.30);'
            . 'border-radius:999px;font-size:12px;font-weight:600;color:#F11348;'
            . 'white-space:nowrap;line-height:1.5;'
            . 'font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">'
            . htmlspecialchars($s, ENT_QUOTES, 'UTF-8')
            . '</span>';
    }

    /* ── Bordas condicionais (última linha sem border-bottom) ─────────── */
    $emailBorder    = ($whatsapp || $origem) ? 'border-bottom:1px solid rgba(255,255,255,0.06);' : '';
    $whatsappBorder = $origem               ? 'border-bottom:1px solid rgba(255,255,255,0.06);' : '';

    /* ── Linha WhatsApp ──────────────────────────────────────────────── */
    $whatsappRow = '';
    if ($whatsapp) {
        $whatsappRow = '
            <tr>
                <td width="130" valign="top" style="padding:14px 0 14px 20px;' . $whatsappBorder . '">
                    <span style="font-size:11px;font-weight:700;color:#828491;text-transform:uppercase;letter-spacing:0.08em;
                                  font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">WhatsApp</span>
                </td>
                <td valign="top" style="padding:14px 20px 14px 12px;' . $whatsappBorder . '">
                    <span style="font-size:14px;font-weight:500;color:#F5F6FC;
                                  font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">'
                        . htmlspecialchars($whatsapp, ENT_QUOTES, 'UTF-8')
                    . '</span>
                </td>
            </tr>';
    }

    /* ── Linha Origem ────────────────────────────────────────────────── */
    $origemRow = '';
    if ($origem) {
        $origemRow = '
            <tr>
                <td width="130" valign="top" style="padding:14px 0 14px 20px;">
                    <span style="font-size:11px;font-weight:700;color:#828491;text-transform:uppercase;letter-spacing:0.08em;
                                  font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">Como me conheceu</span>
                </td>
                <td valign="top" style="padding:14px 20px 14px 12px;">
                    <span style="font-size:14px;font-weight:500;color:#F5F6FC;
                                  font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">'
                        . htmlspecialchars($origem, ENT_QUOTES, 'UTF-8')
                    . '</span>
                </td>
            </tr>';
    }

    $emailEnc    = htmlspecialchars($email,    ENT_QUOTES, 'UTF-8');
    $nomeEnc     = htmlspecialchars($nome,     ENT_QUOTES, 'UTF-8');
    $descricaoEnc = htmlspecialchars($descricao, ENT_QUOTES, 'UTF-8');

    /* ══════════════════════════════════════════════════════════════════════
       TEMPLATE HTML — Alinhado ao design system micheldouglas.dev
    ══════════════════════════════════════════════════════════════════════ */
    return '<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Mensagem &#8212; MichelDouglas.dev</title>
    <style>
        @import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap\');
    </style>
    <!--[if mso]>
    <noscript><xml><o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings></xml></noscript>
    <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#0B0C12;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<!-- ╔══════════════════════════════════════════════════════════════
     ║  OUTER WRAPPER
     ╚══════════════════════════════════════════════════════════════ -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background-color:#0B0C12;">
<tr><td align="center">

    <!-- CONTAINER 640px -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="max-width:640px;">


        <!-- ┌─────────────────────────────────────────────────────────
             │  HEADER — espelhando o menu do site
             └───────────────────────────────────────────────────────── -->
        <tr>
            <td style="background:#15161C;border-bottom:1px solid rgba(255,255,255,0.06);">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding:18px 40px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <!-- Logo -->
                                    <td valign="middle">
                                        <a href="https://micheldouglas.dev" style="display:block;line-height:0;border:0;">
                                            <img src="https://micheldouglas.dev/assets/images/logo/micheldouglas-logo-white.svg"
                                                 alt="MichelDouglas.dev" width="156" height="auto"
                                                 style="display:block;border:0;max-width:156px;">
                                        </a>
                                    </td>
                                    <!-- Nav + CTA -->
                                    <td valign="middle" align="right" style="white-space:nowrap;">
                                        <a href="https://micheldouglas.dev/#sobre"
                                           style="font-size:12px;font-weight:500;color:#828491;text-decoration:none;margin-right:18px;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">Sobre</a>
                                        <a href="https://micheldouglas.dev/#servicos"
                                           style="font-size:12px;font-weight:500;color:#828491;text-decoration:none;margin-right:18px;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">Servi&ccedil;os</a>
                                        <a href="https://micheldouglas.dev/portfolio.html"
                                           style="font-size:12px;font-weight:500;color:#828491;text-decoration:none;margin-right:18px;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">Port&oacute;folio</a>
                                        <a href="https://micheldouglas.dev/contato.html"
                                           style="display:inline-block;padding:8px 16px;
                                                   background:linear-gradient(135deg,#F11348 0%,#ff6978 100%);
                                                   border-radius:8px;font-size:12px;font-weight:600;color:#ffffff;
                                                   text-decoration:none;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            Entre em contato
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>


        <!-- ┌─────────────────────────────────────────────────────────
             │  HERO SECTION — estilo hero do site
             └───────────────────────────────────────────────────────── -->
        <tr>
            <td style="background:#15161C;padding:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                       style="background:linear-gradient(135deg,rgba(241,19,72,0.13) 0%,rgba(255,105,120,0.05) 55%,rgba(21,22,28,0) 100%);">
                    <tr>
                        <td style="padding:56px 40px 52px;">

                            <!-- Section tag -->
                            <p style="margin:0 0 20px;font-size:12px;font-weight:700;color:#F11348;
                                       text-transform:uppercase;letter-spacing:0.12em;
                                       font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                &#x2736;&nbsp; Formul&aacute;rio de Contato
                            </p>

                            <!-- Título -->
                            <h1 style="margin:0 0 18px;font-size:42px;font-weight:800;line-height:1.12;
                                        letter-spacing:-0.03em;color:#F5F6FC;
                                        font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                Nova mensagem<br>
                                <span style="color:#F11348;">recebida!</span>
                            </h1>

                            <!-- Subtítulo -->
                            <p style="margin:0 0 36px;font-size:15px;font-weight:400;color:#828491;line-height:1.75;
                                       font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                <strong style="color:#F5F6FC;font-weight:600;">' . $nomeEnc . '</strong> preencheu o formul&aacute;rio de contato do site.<br>
                                Confira os detalhes abaixo e responda o quanto antes.
                            </p>

                            <!-- Divisor accent gradiente (como as linhas do site) -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td width="48" style="height:2px;background:#F11348;
                                                           line-height:2px;font-size:0;mso-line-height-rule:exactly;">&#160;</td>
                                    <td style="height:2px;background:rgba(241,19,72,0.15);
                                                line-height:2px;font-size:0;mso-line-height-rule:exactly;">&#160;</td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>
            </td>
        </tr>


        <!-- ┌─────────────────────────────────────────────────────────
             │  BODY — seções de conteúdo (bg-secondary: #1a1b22)
             └───────────────────────────────────────────────────────── -->
        <tr>
            <td style="background:#1a1b22;padding:44px 40px 40px;">

                <!-- ── Dados de Contato ──────────────────────────── -->
                <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#F11348;
                            text-transform:uppercase;letter-spacing:0.12em;
                            font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                    &#x2736;&nbsp; Dados de Contato
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                       style="background:#15161C;border-radius:12px;
                               border:1px solid rgba(255,255,255,0.07);margin-bottom:36px;">
                    <!-- Nome -->
                    <tr>
                        <td width="140" valign="top"
                            style="padding:14px 0 14px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
                            <span style="font-size:11px;font-weight:700;color:#828491;text-transform:uppercase;
                                          letter-spacing:0.08em;
                                          font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">Nome</span>
                        </td>
                        <td valign="top"
                            style="padding:14px 20px 14px 12px;border-bottom:1px solid rgba(255,255,255,0.06);">
                            <span style="font-size:14px;font-weight:500;color:#F5F6FC;
                                          font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">' . $nomeEnc . '</span>
                        </td>
                    </tr>
                    <!-- E-mail -->
                    <tr>
                        <td width="140" valign="top"
                            style="padding:14px 0 14px 20px;' . $emailBorder . '">
                            <span style="font-size:11px;font-weight:700;color:#828491;text-transform:uppercase;
                                          letter-spacing:0.08em;
                                          font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">E-mail</span>
                        </td>
                        <td valign="top"
                            style="padding:14px 20px 14px 12px;' . $emailBorder . '">
                            <a href="mailto:' . $emailEnc . '"
                               style="font-size:14px;font-weight:500;color:#F11348;text-decoration:none;
                                       font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">' . $emailEnc . '</a>
                        </td>
                    </tr>
                    ' . $whatsappRow . '
                    ' . $origemRow . '
                </table>

                <!-- ── Serviços de Interesse ─────────────────────── -->
                <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#F11348;
                            text-transform:uppercase;letter-spacing:0.12em;
                            font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                    &#x2736;&nbsp; Servi&ccedil;os de Interesse
                </p>

                <p style="margin:0 0 36px;padding:0;line-height:2;font-size:0;">
                    ' . $servicosHtml . '
                </p>

                <!-- ── Descrição do Projeto ──────────────────────── -->
                <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#F11348;
                            text-transform:uppercase;letter-spacing:0.12em;
                            font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                    &#x2736;&nbsp; Descri&ccedil;&atilde;o do Projeto
                </p>

                <!-- Caixa com borda accent esquerda (padrão do site) -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                       style="margin-bottom:40px;">
                    <tr>
                        <td style="background:#15161C;border-radius:12px;
                                    border:1px solid rgba(255,255,255,0.07);
                                    border-left:3px solid #F11348;
                                    padding:20px 24px;">
                            <p style="margin:0;font-size:14px;font-weight:400;color:#F5F6FC;
                                        line-height:1.85;white-space:pre-wrap;word-break:break-word;
                                        font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">' . $descricaoEnc . '</p>
                        </td>
                    </tr>
                </table>

                <!-- ── CTA: Responder ────────────────────────────── -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td align="center"
                            style="border-radius:10px;
                                    background:linear-gradient(135deg,#F11348 0%,#ff6978 100%);">
                            <a href="mailto:' . $emailEnc . '?subject=Re:%20Contato%20via%20MichelDouglas.dev"
                               style="display:block;padding:17px 32px;font-size:15px;font-weight:700;
                                       color:#ffffff;text-decoration:none;text-align:center;
                                       border-radius:10px;letter-spacing:0.02em;
                                       font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                Responder ao cliente &#x2192;
                            </a>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>


        <!-- ┌─────────────────────────────────────────────────────────
             │  FOOTER — espelhando o footer do site (4 colunas)
             └───────────────────────────────────────────────────────── -->
        <tr>
            <td style="background:#15161C;border-top:1px solid rgba(255,255,255,0.08);">

                <!-- Colunas do footer -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding:36px 40px 0;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr valign="top">

                                    <!-- Col 1: Brand + descrição -->
                                    <td style="padding-right:20px;padding-bottom:28px;width:36%;">
                                        <a href="https://micheldouglas.dev" style="display:block;line-height:0;border:0;margin-bottom:14px;">
                                            <img src="https://micheldouglas.dev/assets/images/logo/micheldouglas-logo-white.svg"
                                                 alt="MichelDouglas.dev" width="148" height="auto"
                                                 style="display:block;border:0;max-width:148px;">
                                        </a>
                                        <p style="margin:0;font-size:12px;font-weight:400;color:#828491;line-height:1.75;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            Designer UX/UI e Desenvolvedor Full-Stack especializado em Low-Code, trazendo o equil&iacute;brio perfeito entre dom&iacute;nio t&eacute;cnico e vis&atilde;o criativa.
                                        </p>
                                    </td>

                                    <!-- Col 2: Atendimento -->
                                    <td style="padding-right:16px;padding-bottom:28px;width:26%;">
                                        <p style="margin:0 0 14px;font-size:14px;font-weight:700;color:#F5F6FC;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">Atendimento</p>
                                        <p style="margin:0 0 9px;font-size:12px;line-height:1.5;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            <a href="mailto:contato@micheldouglas.dev"
                                               style="color:#828491;text-decoration:none;">contato@micheldouglas.dev</a>
                                        </p>
                                        <p style="margin:0 0 9px;font-size:12px;line-height:1.5;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            <a href="https://wa.me/5591993706923"
                                               style="color:#828491;text-decoration:none;">(91) 99370-6923</a>
                                        </p>
                                        <p style="margin:0;font-size:12px;color:#828491;line-height:1.5;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            TV. Brasil, 30 &mdash; Cametá, PA
                                        </p>
                                    </td>

                                    <!-- Col 3: Explore -->
                                    <td style="padding-right:16px;padding-bottom:28px;width:16%;">
                                        <p style="margin:0 0 14px;font-size:14px;font-weight:700;color:#F5F6FC;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">Explore</p>
                                        <p style="margin:0 0 9px;font-size:12px;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            <a href="https://micheldouglas.dev/#sobre"
                                               style="color:#828491;text-decoration:none;">Sobre</a>
                                        </p>
                                        <p style="margin:0 0 9px;font-size:12px;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            <a href="https://micheldouglas.dev/#servicos"
                                               style="color:#828491;text-decoration:none;">Servi&ccedil;os</a>
                                        </p>
                                        <p style="margin:0 0 9px;font-size:12px;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            <a href="https://micheldouglas.dev/portfolio.html"
                                               style="color:#828491;text-decoration:none;">Port&oacute;folio</a>
                                        </p>
                                        <p style="margin:0;font-size:12px;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            <a href="https://micheldouglas.dev/contato.html"
                                               style="color:#828491;text-decoration:none;">Contato</a>
                                        </p>
                                    </td>

                                    <!-- Col 4: Me acompanhe -->
                                    <td style="padding-bottom:28px;width:22%;">
                                        <p style="margin:0 0 14px;font-size:14px;font-weight:700;color:#F5F6FC;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">Me acompanhe</p>
                                        <p style="margin:0 0 9px;font-size:12px;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            <a href="https://github.com/micheldouglas-dev"
                                               style="color:#F11348;text-decoration:none;font-weight:600;">GitHub</a>
                                        </p>
                                        <p style="margin:0 0 9px;font-size:12px;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            <a href="https://linkedin.com/in/micheldouglasdev/"
                                               style="color:#F11348;text-decoration:none;font-weight:600;">LinkedIn</a>
                                        </p>
                                        <p style="margin:0 0 9px;font-size:12px;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            <a href="https://instagram.com/micheldouglas.dev"
                                               style="color:#F11348;text-decoration:none;font-weight:600;">Instagram</a>
                                        </p>
                                        <p style="margin:0;font-size:12px;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            <a href="https://facebook.com/micheldouglas"
                                               style="color:#F11348;text-decoration:none;font-weight:600;">Facebook</a>
                                        </p>
                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Footer bottom bar (espelho do footer-bottom do site) -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <!-- Linha separadora -->
                    <tr>
                        <td style="padding:0 40px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="height:1px;background:rgba(255,255,255,0.08);
                                                font-size:0;line-height:0;mso-line-height-rule:exactly;">&#160;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Copyright row -->
                    <tr>
                        <td style="padding:18px 40px 28px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <!-- mi-logo (monograma) -->
                                    <td valign="middle">
                                        <a href="https://micheldouglas.dev" style="display:block;line-height:0;border:0;">
                                            <img src="https://micheldouglas.dev/assets/images/logo/mi-logo.svg"
                                                 alt="MD" width="30" height="auto"
                                                 style="display:block;border:0;width:30px;">
                                        </a>
                                    </td>
                                    <!-- Copyright text -->
                                    <td valign="middle" align="right">
                                        <p style="margin:0;font-size:11px;color:#828491;
                                                   font-family:\'Inter\',-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
                                            &copy; 2026 &mdash; <strong style="color:#F5F6FC;font-weight:600;">MichelDouglas.dev</strong> Todos os direitos reservados.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>


    </table>
    <!-- /CONTAINER -->

</td></tr>
</table>
<!-- /OUTER WRAPPER -->

</body>
</html>';
}
