<?php include ("inc/header.php"); ?>

<main id="wrapper">

<section id="section-inicio" class="">

	<div class="menu-over menu-izq-top wow slideInLeft">
		<img src="dist/images/cabecera-izq-top.png" alt="Jata Plan Gourmet" >
	</div>
	<div class="menu-over menu-izq-down wow slideInUp">
		<img src="dist/images/cabecera-izq-down.png" alt="Jata Plan Gourmet" >
	</div>

	<div class="menu-over menu-drcha-top wow slideInDown">
		<img src="dist/images/cabecera-drcha-top.png" alt="Jata Plan Gourmet" >
	</div>

	<div class="menu-over menu-drcha-down wow slideInUp">
		<img src="dist/images/cabecera-drcha-down.png" alt="Jata Plan Gourmet" >
	</div>


	<div class="pad-top-10 pad-bottom-10">
		<div class="container-fluid">
			<div class="row">

				<div class="col-xs-12 text-center">
					<img src="dist/images/cabecera-logo.png" alt="Jata Plan Gourmet">
				</div>
				
			</div>
		</div>
	</div>

</section>


<section id="section-codigo" >
	<div class="banda-azul">
		<div class="row">
			<div class="col-xs-12 text-center">
					<h1>Introduce tu código Jata</h1>
			</div>
		</div>		
	</div>
	
		<div class="container-fluid">
			<div class="row row-centered col-canjea-codigo">
				<div class="col-xs-12 col-md-6 col-md-offset-3 text-center mar-top-80 inner-contenedor-formulario">
					<form class="form-inline js-enviar-form-con-validator" method="post" action="ajax/ajax-comprobar-codigo-validado.php" method="post"
						data-enviar-ajax="true"
						data-spinner-holder="#experiencias"
						data-callback="resultadoComprobarCodigoValidado"
						data-mensaje-error="">
						<div class="input-group col-codigo-xs">
							<input type="text" id="itExperiencia" name="codigo" class="form-control" placeholder="Tu código" required>
							<span class="input-group-btn btn-100">
								<button class=" btn-canjear js-validar-codigo" type="submit">CANJEA TU CÓDIGO</button>
							</span>

						</div><!-- /input-group -->

					</form>

				<div class="js-spinner-holder"></div>
			</div>
			<form id="form-codigo" method="post">
				<input type="hidden" name="codigo_redimir" id="codigo_redimir">
				<input type="hidden" name="cliente_id" id="cliente_id">
				<input type="hidden" name="cliente_nombre" id="cliente_nombre">
				<input type="hidden" name="cliente_apellido" id="cliente_apellido">
				<input type="hidden" name="cliente_dni" id="cliente_dni">
				<input type="hidden" name="cliente_email" id="cliente_email">
				<input type="hidden" name="cliente_telefono" id="cliente_telefono">
			</form>
			<div class="col-xs-12 mar-top-40">
					<div class="boton js-boton-saber-mas">
						<a class="btn btn-primary js-scroll-ancla" data-scroll-offset="65" href="#section-formulario">CONSIGUE TU CÓDIGO AHORA</a>
						<br>
						<a class="js-scroll-ancla" data-scroll-offset="65" href="#section-formulario"><span class="fa fa-caret-down fa-2"></span></a>
					</div>
					
			</div>
		</div>
		
		<div class="row row-centered col-form-bono">
			<?php  include("experiencias.php"); ?>
		</div>




	</div>
</section>

<section id="section-participa">


	<div class="platos-over plato-izq wow slideInLeft">
		<img src="dist/images/mecanica-plato-izq.png" alt="pasta frutti di mare" class="plato izq">
	</div>

	<div class="platos-over plato-drcha wow slideInRight">
		<img src="dist/images/mecanica-plato-drch.png" alt="tarta de frutos rojos" class="plato drcha">
	</div>

	
	<div class="container-fluid sombra-azul">
		<div class="row cabecera-pasos">
			<div class="col-xs-12 text-center titulo">
				<span >Quiero participar</span>
			</div>
		</div>
		<div class="row pasos">
			
			<div class="col-xs-12 col-md-6 paso1 text-left impar fgris"  >
				<img src="dist/images/mecanica-paso-1.png" alt="Paso 1" class="img-paso">
				<span class="titulo-paso">Compra</span>
				<p class="text-center no-cursor">Compra una de nuestras planchas en promoción<sup>*</sup> entre el 1 de junio y el 31 de julio de 2016, recuerda conservar el ticket de compra.
				</p>
				<p class="texto-mini"><sup>*</sup>Planchas incluidas en la promoción: GR555A, GR556A, GR557A, GR558 Y GR559</p>
			</div>
			<div class="col-xs-12 col-md-6 paso2 text-right par fblanco"  >
				<span class="titulo-paso">Participa</span>
				<img src="dist/images/mecanica-paso-2.png" alt="Paso 2" class="img-paso">
				<p class="text-center no-cursor">Puedes participar haciendo clic en el botón <a href="javascript:;" class="js-mostrar-formulario">Siguiente</a> rellena el formulario de participación y sube tu ticket de compra</p>
				<br>
			</div>
			<div class="col-xs-12 text-center comoparticipar">
				<img src="dist/images/mecanica-comoparticipar.png" alt="Como participar" class="img-comoparticipar">
			</div>
			<div class="col-xs-12 col-md-6 paso3 text-left impar fblanco"  >
				<img src="dist/images/mecanica-paso-3.png" alt="Paso 3" class="img-paso">
				<span class="titulo-paso">Canjea</span>
				<p class="text-center no-cursor">En unos días recibirás por correo electrónico tu código Jata, que podrás canjear por una experiencia gourmet en <a href="https://www.jataplangourmet.com" target="_blank">www.jataplangourmet.com</a></p>
			</div>
			<div class="col-xs-12 col-md-6 paso4 text-right par fgris"  >
				<span class="titulo-paso">Disfruta</span>
				<img src="dist/images/mecanica-paso-4.png" alt="Paso 4" class="img-paso">
				<p class="text-center no-cursor">Disfruta de tu experiencia gourmet el día y a la hora concertada con el centro. No olvides llevar contigo tu bono y DNI</p>
			</div>
			<div class="col-xs-12 text-center siguiente">
				<div class="boton">
						<a class="btn btn-primary js-mostrar-formulario bt-siguiente" data-scroll-offset="65"  >SIGUIENTE</a>
				</div>		
			</div>
			
		</div>

		<div class="row formulario-participa">
			
				<form id="registro_codigo" class="form-inline js-enviar-form-con-validator "  action="ajax/ajax-registrar-codigo.php" method="post" enctype="multipart/form-data"
					data-mensaje-error="Revisa los siguientes datos para poder recibir tu código:"
					data-callback="resultadoRegistro"
					data-enviar-ajax="true"
					data-spinner-holder="#registro_codigo">

				<div class="row">

					<div class="form-group col-xs-12 col-sm-6 col-md-5 col-md-offset-1 text-left" data-mensaje-error="Introduce tu nombre">
						<div class="row">
							<div class="col-xs-12 ">
					    		<label for="itNombre" >Nombre</label>
					    	</div>
					    	<div class="col-xs-12">
					    		<input type="text" class="form-control" id="itNombre" name="nombre" placeholder="Nombre" required>
					    	</div>
					    </div>
					</div>
					<div class="form-group col-xs-12 col-sm-6 col-md-5 text-left" data-mensaje-error="Introduce tus apellidos">
						<div class="row">
							<div class="col-xs-12">
					    		<label for="itApellidos"  >Apellidos</label>
					    	</div>
					    	<div class="col-xs-12">
					    		<input type="text" class="form-control" id="itApellidos" name="apellidos" placeholder="Apellidos" required>
					    	</div>
					    </div>
					</div>
					<div class="form-group col-xs-12 col-sm-6 col-md-2 col-md-offset-1 text-left" data-mensaje-error="Elige sexo">
						<div class="row">
							<div class="col-xs-12 ">
					    		<label for="selSexo"  >Sexo</label>
					    	</div>
					    	<div class="col-xs-12">
					    		<select class="form-control" id="selSexo" name="sexo" required>
									<option value="">Selecciona...</option>
									<option value="H">Hombre</option>
									<option value="M">Mujer</option>
								</select>
					    	</div>
					    </div>
					</div>
					<div class="form-group col-xs-12 col-sm-6 col-md-3 text-left" data-mensaje-error="Introduce tu Provincia">
						<div class="row">
							<div class="col-xs-12 ">
					    		<label for="itCP">Código Postal</label>
					    	</div>
					    	<div class="col-xs-12">
					    		<input type="text" class="form-control" id="itCP" name="cp" placeholder="Código Postal" required data-cp="cp" maxlength="5">
					    	</div>
					    </div>
					</div>




					<div class="form-group col-xs-12 col-sm-6 col-md-5 text-left" data-mensaje-error="Introduce tu DNI/NIE válido (Ej. DNI: 00000000Z, Ej. NIE: X0000000P)">
						<div class="row">
							<div class="col-xs-12 ">
					    		<label for="itDNI"  >DNI/NIE</label>
					    	</div>
					    	<div class="col-xs-12">
					    		<input type="text" class="form-control js-forzar-mayusculas" id="itDNI" name="dni" placeholder="DNI" required data-dni="dni"  >
					    	</div>
					    </div>
					</div>



					<div class="form-group col-xs-12 col-sm-6 col-md-5 col-md-offset-1 text-left" data-mensaje-error="Introduce una dirección de email válida">
						<div class="row">
							<div class="col-xs-12 ">
					    		<label for="itEmail" >E-mail</label>
					    	</div>
					    	<div class="col-xs-12">
					    		<input type="email" class="form-control" id="itEmail" name="email" placeholder="E-mail" required>
					    	</div>
					    </div>
					</div>
					<div class="form-group col-xs-12 col-sm-6 col-md-5 anti-paste text-left" data-mensaje-error="Confirma tu dirección de email (las dos direcciones deben coincidir)">
						<div class="row">
							<div class="col-xs-12">
					    		<label for="itConf">Confirma tu e-mail</label>
					    	</div>
					    	<div class="col-xs-12">
					    		<input type="email" class="form-control" id="confEmail" placeholder="E-mail" required data-match="#itEmail">
					    	</div>
					    </div>
					</div>

					<div class="form-group col-xs-12 col-sm-6 col-md-5 col-md-offset-1 text-left" data-mensaje-error="Introduce las nueve cifras de tu número de teléfono">
						<div class="row">
							<div class="col-xs-12 ">
					    		<label for="itTelefono" >Teléfono</label>
					    	</div>
					    	<div class="col-xs-12">
					    		<input type="text" class="form-control" id="itTelefono" name="telefono" placeholder="Teléfono" required data-telefono="telefono" maxlength="9">
					    	</div>
					    </div>
					</div>

					<div class="form-group col-xs-12  col-sm-6 col-md-5 text-left" data-mensaje-error="Selecciona un imagen de tu ticket de compra (los formatos válidos son JPG, GIF, PNG, PDF). Peso máximo 10MB.">
				    	<div class="row">
							<div class="col-xs-12 ">
							    	<label for="itConf" class="seccion_form">Sube tu ticket <span>(Formato JPG, GIF, PNG, PDF. Máximo 10MB.)</span></label>
							</div>

							<div class="col-xs-12">
								<div class="row">
									<div class="col-xs-8 no-padding-right">
										<input type="text" class="form-control " id="nombreImagen" readonly required >
									</div>
									<div class="col-xs-4 no-padding-left">
										 <span id="btn-examinar-photo" class="btn btn-primary btn-file js-examinar"
										    data-js-examinar-url="ajax/ajax-registrar-codigo.php"
										    data-js-examinar-target="targetImagen"
										    data-js-examinar-maxsize="10Mb"
										    data-js-examinar-accept="images,pdf,zip"
										    data-js-examinar-boton-enviar="btn-enviar"
										    data-js-examinar-multi-selection="false"
										    data-js-examinar-form="registro_codigo"
										    data-js-examinar-callback="resultadoRegistro"
										    data-js-examinar-nofile="sinarchivo_registro_codigo"
										    data-js-examinar-filter="filtro_registro_codigo"
										    data-js-examinar-nombre-archivo="nombreImagen">
										    Buscar...
										</span>
										<!-- <div class="circulo-imagen" id="targetImagen" style="width:200px;height:200px"></div> -->
										 <!-- <span id="nombreImagen" class="nombreImagenSubida"></span>  -->
									</div>
								</div>

							</div>
						</div>
					</div>

					<div class="col-xs-12 col-sm-6 col-md-5 col-md-offset-1 text-left">
						<div class="form-group chck"  data-mensaje-error="Debes aceptar los <a href='documentos/terminos-condiciones.pdf' target='_blank'>Términos y condiciones</a> y la <a href='documentos/aviso-legal.pdf' target='_blank'>Política de Privacidad</a> de la promoción.">
				    		<input class="form-control css-checkbox" type="checkbox" name="politica" required id="check-legal">
				    		<label class="checkbox css-label" for="check-legal">Acepto los <a href="documentos/terminos-condiciones.pdf" target="_blank">Términos y Condiciones</a> y la <a href="documentos/aviso-legal.pdf" target="_blank">Política de Privacidad</a> de la promoción.</label>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-5">
						<div class="form-group chck">
				    		<input class="form-control css-checkbox" type="checkbox" name="check_recibir" id="check_recibir">
				    		<label class="checkbox css-label" for="check_recibir">Acepto recibir información comercial de Electrodomésticos Jata S.A.<sup>*</sup></label>
						</div>

					</div>
					<div class="col-xs-12 col-sm-6 col-md-10 col-md-offset-1 text-left info_comercial">
					<sup>*</sup>Marcando la casilla de aceptar la recepión de información comercial, el participante autoriza y presta su pleno consentimiento a Electrodomésticos Jata S.A. para que pueda proceder al envío al participante de comunicaciones comerciales, publiciarias y promocionales por correo postal, electrónico, fax o por otros medios de comunicación electrónica equivalentes, por lo ue los datos referentes a los mismos serán utilizados para llevar a cabo dichas comunicaciones. No obstante, le informamos que podrá revocar el consentimiento al envío de dichas comunicaciones, en cada comunicado comercial o publicitario que se le haga llegar, y en cualquier momento, mediante notificación remitida a la siguiente dirección: publijata@jata.es
					</div>
					<div class="col-xs-4 col-xs-offset-4 text-center mar-top-20 mar-bottom-40 participar">

						<div class="boton js-boton-participar ">
									<a id="btn-enviar" class="btn btn-primary">PARTICIPAR</a>
						</div>
					</div>

					
				</div>
				<div class="js-spinner-holder"></div>
			</form>
		
				
			


		</div>	
		<div class="row gracias-participar">	
			<div class="col-xs-12 text-center">
			<span class="titular">¡Muchas gracias!</span>
			</div>
			<div class="col-xs-10 col-xs-push-1 text-center">
			<p>¡Muchas gracias por registrarte! En unos días validaremos tus datos y te enviaremos un mensaje de correo electrónico confirmando la activación de tu código promocional para que lo puedas canjear por tu experiencia gourmet.</p>
			<p>Recuerda comprobar tu bandeja de correo no deseado.</p>
			</div>
			<div class="col-xs-12 text-center">
				<div class="boton js-boton-volver ">
					<a id="btn-enviar" class="btn btn-primary">VOLVER</a>
				</div>
			</div>
		</div>

	</div>
	<div class="container-fluid sombra-azul mar-top-100">


		<div class="row">
			<div class="col-xs-12 text-center info-participar">
			<p>También puedes participar rellenando tus datos en el folleto promocional y enviándolo junto con una copia del ticket de compra a "Promoción Jata Plan Gourmet" Apartado de correos 53094, 28080 Madrid.</p>
			</div>
		</div>
		
	</div>
	

</section>

<!-- <section id="section-formulario" class="js-full-screen">
	<div class="container-fluid ">
		<div class="row js-formulario">
			<div class="col-xs-12 inner-contenedor-formulario text-center js-fadeinout" id="registro-codigo">
				<?php
				//include('inc/formulario.php');
				?>
			</div>
		</div>
	</div>
</section> -->


</main>

<?php include ("inc/footer.php"); ?>