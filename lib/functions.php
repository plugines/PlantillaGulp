<?php 

/**
 * @param  string  $filename
 * @return string
 */
function asset_path($filename) {
    $manifest_path = 'dist/assets.json';

    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), TRUE);
    } else {
        $manifest = array();
    }

    if (array_key_exists($filename, $manifest)) {
        return $manifest[$filename];
    }

    return $filename;
}




/**

FUNCIONES AUXILIARES

**/

function curlPost($url, $data, $auth = null)
{
    if(empty($url) OR empty($data)) 
        return 'Error: invalid Url or Data';
        
    $query_string = http_build_query($data);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, count($query_string));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $query_string);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)");  
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    if ($auth)
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: ' . $auth));

    $result = curl_exec($ch);

    curl_close($ch);
    return json_decode($result,true);
}



// para modificar la orientación en fotos cuando se suben desde móvil
function image_fix_orientation($filename) {
    $exif = exif_read_data($filename);
    if (!empty($exif['Orientation'])) {

        $extension = strtolower(strrchr($file, '.'));

        switch ($extension) {
            case '.jpg':
            case '.jpeg':
                $image = @imagecreatefromjpeg($filename);
                break;
            case '.gif':
                $image = @imagecreatefromgif($filename);
                break;
            case '.png':
                $image = @imagecreatefrompng($filename);
                break;
            default:
                $img = false;
                break;
        }

        switch ($exif['Orientation']) {
            case 3:
                $image = imagerotate($image, 180, 0);
                break;

            case 6:
                $image = imagerotate($image, -90, 0);
                break;

            case 8:
                $image = imagerotate($image, 90, 0);
                break;
        }

        imagejpeg($image, $filename, 90);
    }
}

/*devuelve la página o ultimo path de la url*/
function get_paginaURL(){
    $url = $_SERVER['REQUEST_URI'];
    $tokens = explode('/', $url);
    $url=$tokens[sizeof($tokens)-1];

    $pos = strrpos( $url, ".php");
    if ($pos === false) { $url='index';}else{
        $tokens = explode('.php', $url);
        $url=$tokens[0];

    }


    return $url;
}

// FUNCIONES PARA RELLENAR LOS SELECTS: DIA, MES, AÑO
function opt_dias(){
    $dias = "<option value=''>Día</option>";
    for ($i = 1; $i <= 31; $i++) {
        $dia = sprintf("%02d", $i);
        $dias .= "<option value='".$dia."'>".$dia."</option>";
    }
    echo $dias;
}
function opt_meses(){
    $meses = "<option value=''>Mes</option>";
    for ($i = 1; $i <= 12; $i++) {
        $mes = sprintf("%02d", $i);
        $meses .= "<option value='".$mes."'>".$mes."</option>";
    }
    echo $meses;
}
function opt_annos($_min = null, $_max =null){
    if($_max==null){
        $_max = 2015;
    }
    if($_min==null){
        $_min = 1915;
    }
    $annos = "<option value=''>Año</option>";
    for ($i = $_min; $i <= $_max; $i++) {
        $annos .= "<option value='".$i."'>".$i."</option>";
    }
    echo $annos;
}

/**

FUNCIONES EMAIL

**/

function envioEmailSMTP($_email,$_nombre,$_asunto,$_body){
        global $modo_produccion;
        global $email_host;
        global $email_username;
        global $email_pass;
        global $email_from;
        global $email_from_name;


        $mail = new PHPMailer();
        $mail->CharSet = 'UTF-8';
        $mail->SetFrom($email_from[$modo_produccion], $email_from_name[$modo_produccion]);

        $mail->IsSMTP(); // vamos a conectarnos a un servidor SMTP
        $mail->Host = $email_host[$modo_produccion];
        $mail->SMTPAuth = true;                              // usaremos autenticacion
        $mail->Username = $email_username[$modo_produccion]; // usuario
        $mail->Password = $email_pass[$modo_produccion];     // contraseña
        $mail->isHTML(true);                                 // Set email format to HTML
        $mail->AddAddress($_email, $_nombre);

        $mail->Subject = $_asunto;
        $mail->MsgHTML($_body);
 //    $mail->Body    = utf8_decode($body);
        $mail->AltBody = $body;

        if($mail->Send()) {
          return true;
        } else {
          return $mail->ErrorInfo;
        }

}

function envioEmailSMTPconAdjunto($_email,$_nombre, $_template, $_attachment){
        global $modo_produccion;
        global $email_host;
        global $email_username;
        global $email_pass;
        global $email_from;
        global $email_from_name;

        $_body = file_get_contents('../'.$_template);

        $mail = new PHPMailer();
        $mail->CharSet = 'UTF-8';
        $mail->SetFrom($email_from[$modo_produccion], $email_from_name[$modo_produccion]);

        $mail->IsSMTP(); // vamos a conectarnos a un servidor SMTP
        $mail->Host = $email_host[$modo_produccion];
        $mail->SMTPAuth = true;                              // usaremos autenticacion
        $mail->Username = $email_username[$modo_produccion]; // usuario
        $mail->Password = $email_pass[$modo_produccion];     // contraseña
        $mail->isHTML(true);                                 // Set email format to HTML
        $mail->AddAddress($_email);
        //echo 'file = '.$_attachment;
        //die();
        $mail->AddAttachment("../downloads/".$_attachment); 

        $mail->Subject = 'Reserva confirmada ¡Disfruta de tu experiencia Jata Plan Gourmet! ¡Aquí tienes tu bono!';
        $mail->MsgHTML($_body);
 //    $mail->Body    = utf8_decode($body);
        $mail->AltBody = 'Enhorabuena! Aquí tienes tu bono.';

        if($mail->Send()) {
            $respuesta['resultado'] = 'OK';
            $respuesta['error'] = array('code' => '0', 'msg_error' => 'OK');
        } else {
            $respuesta['resultado'] = 'KO';
            $respuesta['error'] = array('code'=>'90410','msg_error'=> 'No hemos podido enviarte un email con el bono.', 'data' => $mail->ErrorInfo);
        }

        return $respuesta;

}

