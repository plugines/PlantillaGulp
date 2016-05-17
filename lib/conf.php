<?php 




/** 
DATOS DE LA PROMO
		// 
**/ 
$id_promocion 	= '21';
$dominio[0]= '192.168.1.50';
$dominio[1]= 'jataplangourmet.com';

$dom = strrpos($_SERVER['SERVER_NAME'], $dominio[0]);
if ($dom === false) { $modo_produccion = 1; }else{ $modo_produccion = 0; }  // 0 > desarrollo  :: 1 > produccion


/** 
ACCESO BBDD
**/ 
$dbhost[0]     = "localhost";
$dbname[0]     = "2860-jataplangourmet";
$dbuser[0]     = "root";
$dbpass[0]     = "plugin";

$dbhost[1]     = "localhost";
$dbname[1]     = "jataplango_bbdd";
$dbuser[1]     = "jataplango_bbdd";
$dbpass[1]     = "r4LVHSWw36";


/** 
SMTP EMAIL
**/ 
/*$email_host[0]     	= "mail.jataplangourmet.com";
$email_username[0]  = "contacta@jataplangourmet.com";
$email_pass[0]     	= "PFcUulze6";
$email_from[0]     	= "contacta@jataplangourmet.com";
$email_from_name[0]	= "Promoción Jata Plan Gourmet";

$email_host[1]     	= "localhost";
$email_username[1]  = "contacta@jataplangourmet.com";
$email_pass[1]     	= "PFcUulze6";
$email_from[1]      = "contacta@jataplangourmet.com";
$email_from_name[1]	= "Promoción Jata Plan Gourmet";*/


/** 
MULTIIDIOMA
		// si hay multi-idioma, BAJAR DE COMPONENENTES LA CARPETA i18n
		// y ponerla en la raíz del sitio
**/ 
define("MULTI_IDIOMA",false);
$_SESSION['lang']="es";
	

/** 
FACEBOOK
		// so no hay código FB, no se carga la librería
		// para multi-idioma, poner L::langcode
**/ 
define("FB_APP_ID", "");
define("FB_LANG", "es_ES");


/** 
GOOGLE ANALYTICS
		// so no hay código GA, no se carga la librería
**/ 
define("GA_CODE", "");