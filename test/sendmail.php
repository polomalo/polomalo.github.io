<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';
require 'phpmailer/src/Exeption.php';
require 'phpmailer/src/PHPMailer.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');

    //Recipients
    $mail->setFrom('dima7012095@gmail.com', $_POST['name']);
    $mail->addAddress('polomalo95@yandex.by', 'polomalo95');     //Add a recipient
    
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Here is the subject';
    
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    if (trim(!empty($_POST['contactUs--name']))) {
        $body.='<p><strong>Name:</strong>'.$_POST['contactUs--name'].'</p>';
    }
    if (trim(!empty($_POST['contactUs--email']))) {
        $body.='<p><strong>E-mail:</strong>'.$_POST['contactUs--email'].'</p>';
    }
    if (trim(!empty($_POST['contactUs--message']))) {
        $body.='<p><strong>Message:</strong>'.$_POST['contactUs--message'].'</p>';
    }

    $mail->Body = $body;
    $message = 'Данные отправлены!';
    $response = ['message' => $message]

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    $response = 'Ошибка';
    $response = ['message' => $message]
}