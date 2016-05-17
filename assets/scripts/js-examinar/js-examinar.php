<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=0">
	<title>title</title>

	<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">-->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--[if lte IE 8]>
      <script type="text/javascript" src="js/ie8.polyfil.min.js"></script>
    <![endif]-->

	<!-- Bootstrap CDN to font-awesome-->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
    
    <!-- Plug-in components -->
    <script type="text/javascript" src="js/plupload.full.min.js"></script>
	<script src="js/js-examinar.js"></script>
</head>
<body>

	<!-- Formulario de datos que se envían junto al archivo -->
    
	<form id="datos">
    	<input type="hidden" name="field" id="field" value="value" />
    </form>

	<!-- Botón de examinar con la configuración 
    		target: Si está definido, es el div donde se previsualiza la imagen
            url: Ajax que atiende la subida
            maxsize: Tamaño máximo del archivo
            accept: Tipos aceptados
            boton-enviar: ID del div que empieza el envío
            multi-eletion: bool que indica si podemos subir varios archivos
            form: Formulario con datos auxiliares
            callback: Función llamada al final del proceso
            nofile: Función llamada si no se ha seleccionado ningún archivo
            filter: Función de precondición antes de enviar el archivo -->
            
    <span id="btn-examinar-photo" class="btn btn-lg btn-file js-examinar" 
        data-js-examinar-target="targetImagen" 
        data-js-examinar-url="ajax-guardar.php"
        data-js-examinar-maxsize="10Mb"
        data-js-examinar-accept="images,pdf,zip"
        data-js-examinar-boton-enviar="btn-enviar"
        data-js-examinar-multi-selection="false"
        data-js-examinar-form="datos"
        data-js-examinar-callback="callback" 
        data-js-examinar-nofile="sinArchivo"
        data-js-examinar-filter="filtro">
    
	    Browse...
    </span>
    
    <!-- Botón de enviar -->
    <span id="btn-enviar" class="btn btn-lg">ENVIAR</span>
    
    <!-- DIV donde se previsualiza la imagen -->
    <div class="circulo-imagen" id="targetImagen" style="width:400px;height:400px"></div>
      
    <script>
	
	<!-- FILTRO CAMPOS -->
	
	function filtro() {
		if ($("#field").val() == "value") return true;
		else {
			alert("Falta valor");
			return false;
		}
	}
	
	<!-- CALLBACK OK -->
	function callback(_res) {
		var res = JSON.parse(_res);
		alert(res.cod);
	}
	
	<!-- ERROR se ha enviado sin archivo -->
	function sinArchivo() {
		alert("Sin archivo");
	}
	
	</script>
    
</body>
</html>