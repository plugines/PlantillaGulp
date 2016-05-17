<?php
include ("lib/lib.php");

$f = time();
if (isset($_GET['hoy'])){
  $f = strtotime($_GET['hoy']); 
}

if ($f>strtotime('2016-12-15 23:59:59')){
  die('<script>document.location.href="cierre.html"</script>');
}
?>
<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=0">
	<title>JATA :: PLAN GOURMET</title>

  <meta property="og:title" content="JATA :: PLAN GOURMET" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://jataplangourmet.com/dist/images/shareFB.jpg" />
  <meta property="og:url" content="https://jataplangourmet.com" />
  <meta property="og:description" content="¡Ya tengo mi GastroPlan! Voy a disfrutar de una Experiencia Gourmet gracias a las planchas Jata Electro. Aprovecha esta oportunidad única ¡no esperes más!" />


  <!-- styles -->
  <link rel="shortcut icon" href="favicon.ico" />

  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--[if lte IE 8]>
    <script type="text/javascript" src="js/ie8.polyfil.min.js"></script>
    <![endif]-->

    <!-- Main CSS -->
    <link href="dist/styles/<?=asset_path('main.css')?>" rel="stylesheet">
    
    <!-- ANALYTICS -->
    <?php require "inc/_ga.php"; ?>
    <!-- END ANALYTICS -->
  </head>
  <body class="<?php echo(get_paginaURL()); ?>" data-fs-minheight="" data-fs-maxheight="" data-fs-offsettop="40" data-fs-offsetbottom="60" data-fs-minwidth="768">

    <?php
      if(!isset($_COOKIE["www-jata-es-eu-cookie"])){
    ?>
      <div id="cookie-banner">
        <div class="container">
          <div class="row">
          <div class="col-xs-9">
            <span><b>PARA OFRECER UN MEJOR SERVICIO</b></span>
            <p>Electrodomésticos Jata S.A. utiliza el sistema de cookies. Si quieres continuar navegando por la página, debes aceptar nuestra <a href="/documentos/politica-cookies.pdf" target="_blank">Política de Cookies y Privacidad</a>.</p>
          </div>
          <div class="col-xs-3">
            <button class="btn btn-primary btn-acepto js-acepto-cookie">ACEPTO</button>
            <span class="closeCookie">X</span>
          </div>
          </div>
        </div>
      </div>
    <?php
      }
    ?>

    <header>
      <nav class="navbar-default navbar-fixed-top" role="navigation">
        <div class="container-fluid">

          <div id="logo" class="navbar-header mar-top-15">
            <a href="http://www.jata.es/" target="_blank"><img src="dist/images/header-logo-jata.png" alt="Jata Plan Gourmet"></a>
          </div>
          <div class="navbar-nav navbar-right">
            <a href="javascript:;" data-scroll-offset="75" class="js-btn-contacta js-fadeinout js-scroll-ancla"  data-mostrar=".js-contacto-header">Contacta <i class="fa fa-chevron-down" aria-hidden="true"></i></span></a>
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span>MENÚ</span>
            </button>
          </div>

          <div class="row ">
            <div class="col-xs-12 col-sm-9 text-center col-menu-center">
              <div class="navbar-nav navbar-center">
                <div id="navbar" class="collapse navbar-collapse navbarspy">
                  <ul class="nav navbar-nav">
                    <?php if ($menuAbsoluto!=true){ ?>
                    <li class=""><a href="#section-inicio" class="js-scroll-ancla" data-scroll-offset="39">Inicio</a></li>
                    <li class=""><a href="#section-codigo" class="js-scroll-ancla" data-scroll-offset="39">Canjear código</a></li>
                    <li class=""><a href="#section-participa" class="js-scroll-ancla" data-scroll-offset="39">Quiero participar</a></li>
                    <?php }else{ ?>
                    <li class=""><a href="index.php#section-inicio" class="" data-scroll-offset="39">Inicio</a></li>
                    <li class=""><a href="index.php#section-codigo" class="" data-scroll-offset="39">Canjear código</a></li>
                    <li class=""><a href="index.php#section-participa" class="" data-scroll-offset="39">Quiero participar</a></li>
                    <?php } ?>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </nav>


      <div class="contacto-header js-contacto-header js-layer-header">

        <div class="banda-azul">
            <div class="row">
              <div class="col-xs-12 text-center">
                  <h2>Contacta con nosotros</h2>
              </div>
            </div>    
          </div>


        <div class="container-fluid">
          <div class="formulario-contacto">
            <div class="row">
              <div class="col-xs-12 col-sm-10 col-sm-offset-2">
                <?php include('inc/contacto.php');?>
              </div>
              <div class="col-xs-12 text-right cursorPointer js-fadeinout" data-mostrar=".js-contacto-header">
                <span class="fa fa-caret-up fa-2"></span>
              </div>
            </div>
          </div>


        </div>
      </div>

      <div id="" class="spinner-holder"></div>

    </header>