<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Cargar las dependencias de PHPMailer
require './PHPMailer-master/src/Exception.php';
require './PHPMailer-master/src/PHPMailer.php';
require './PHPMailer-master/src/SMTP.php';

// Capturar los datos del formulario
$nombre = $_POST['username'];
$telefono = $_POST['phone'];
$email = $_POST['email'];
$mensaje = $_POST['message'];

// Inicializar PHPMailer
$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host = '';  // Cambia esto al servidor SMTP de tu proveedor (e.g., smtp.ejemplo.com)
    $mail->SMTPAuth = true;
    $mail->Username = '';  // Tu usuario de SMTP
    $mail->Password = '';  // Tu contraseña de SMTP
    $mail->SMTPSecure = '';  // Puede ser 'ssl' o 'tls' según tu servidor SMTP
    $mail->Port = 0;  // Puerto, usualmente 465 para 'ssl' o 587 para 'tls'

    // Establecer la codificación de caracteres
    $mail->CharSet = 'UTF-8';

    // Configuración del remitente y destinatarios
    $mail->setFrom('', 'Formulario de Contacto');  // Remitente del correo (e.g., tuusuario@tuweb.com)
    $mail->addAddress('');  // Dirección de correo a la que quieres enviar el formulario (destinatario)
    $mail->addReplyTo($email, $nombre);  // Dirección de respuesta configurada con el correo del formulario

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = 'Nueva consulta desde el formulario de contacto';
    $mail->Body    = "<h1>Nueva consulta de contacto</h1>
                      <p><strong>Nombre:</strong> $nombre</p>
                      <p><strong>Teléfono:</strong> $telefono</p>
                      <p><strong>Email:</strong> $email</p>
                      <p><strong>Mensaje:</strong> $mensaje</p>";
    $mail->AltBody = "Nombre: $nombre\nTeléfono: $telefono\nEmail: $email\nMensaje: $mensaje";  // Texto plano si no soporta HTML

    // Enviar el correo
    if ($mail->send()) {
        echo '<p style="color: green; font-weight: bold;">¡Consulta enviada correctamente!</p>';
    } else {
        echo '<p style="color: red; font-weight: bold;">Hubo un error al enviar la consulta. Por favor, inténtalo de nuevo.</p>';
    }
} catch (Exception $e) {
    echo "<p style='color: red; font-weight: bold;'>El mensaje no pudo ser enviado. Error: {$mail->ErrorInfo}</p>";
}
?>
