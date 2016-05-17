<?php
session_start();
header('P3P: CP="CAO PSA OUR"');
header('Content-type: text/html; charset=utf-8');
$base_dir =  dirname(__dir__).'/'; 
require $base_dir."lib/conf.php";
require $base_dir."lib/filtrado.php";
require $base_dir."lib/PHPMailer/PHPMailerAutoload.php";
require $base_dir."lib/functions.php";

// Show Errors
ini_set('display_errors', 1); 
ini_set('log_errors', 1); 
//error_reporting(E_ALL);
error_reporting(E_ERROR | E_WARNING |E_PARSE);

setlocale(LC_CTYPE, 'es_ES');
mb_internal_encoding("UTF-8");
date_default_timezone_set("Europe/Madrid");

/*
if ($dbhost!="")
{
	require $base_dir."lib/database.php";
	$_db = new DataBase ($dbhost,$dbname,$dbuser,$dbpass);
}*/

if ($dbhost[$modo_produccion]!="")
{
	require $base_dir."lib/database.php";
	$_db = new DataBase ($dbhost[$modo_produccion],$dbname[$modo_produccion],$dbuser[$modo_produccion],$dbpass[$modo_produccion]);
}

// i18n: GESTIÓN MULTI IDIOMA
// https://github.com/Philipp15b/php-i18n
if(MULTI_IDIOMA)
{
	require $base_dir."i18n/i18n.class.php";
	$_i18n = new i18n('i18n/lang/lang_{LANGUAGE}.json', 'i18n/langcache/', 'es');
	$_i18n->init();
	if (isset($get_lang)) $_SESSION['lang'] = $get_lang;
}


