  <!-- Modal -->
  <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">x</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
          <p>Some text in the modal.</p>
        </div>
<!--         <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
        </div>
 -->      </div>

    </div>
  </div>

  <!-- Modal de confirmación específico para la promo de Jata -->
  <div id="myModalConfirmacion" class="modal fade " role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">x</button>
          <h4 class="modal-title">¿Has realizado la reserva en el centro?</h4>
        </div>
        <div class="modal-body inner-contenedor-formulario">
          <p>Recuerda que tienes que hacer la reserva de tu experiencia gourmet llamando al teléfono del centro de tu elección</p>
      
         <form id="descargar-bono" class="js-enviar-form-con-validator" action="ajax/ajax-descargar-bono.php" method="POST"
        data-callback="respuestaBono"
        data-mensaje-error="Rellena todos los datos para poder descargar tu bono."
        data-spinner-holder="#experiencias3">

          <button type="button" class="btn btn-default" data-dismiss="modal">NO, VOLVER PARA LLAMAR</button>
          <button type="submit" class="btn btn-default js-reservar" >SI, TENGO MI RESERVA</button>
          <input type="hidden" id="cliente_id_descarga" name="cliente_id" value="">
                <input type="hidden" id="codigo_redimir_descarga" name="codigo_redimir" value="">
                <input type="hidden" id="codigo_centro_descarga" name="codigo_centro_descarga" value="">
                <input type="hidden" id="codigo_experiencia_descarga" name="codigo_experiencia_descarga" value="">
                <input type="hidden" id="direccion_centro_descarga" name="direccion_centro_descarga" value="">
                <input type="hidden" id="telefono_centro_descarga" name="telefono_centro_descarga" value="">
                <input type="hidden" id="provincia_centro_descarga" name="provincia_centro_descarga" value="">
                <input type="hidden" id="itNombre_descarga" name="nombre" value="" >
                <input type="hidden" id="itDNI_descarga" name="dni"   value="" >
                <input type="hidden" id="itTelefono_descarga" name="telefono" value="" >
                <input type="hidden" id="itApellidos_descarga" name="apellidos" value=""  >
                <input type="hidden" id="itEmail_descarga" name="email" value="" >
                <input type="hidden" id="itCentro_descarga" name="centro"  value=""   >
                <input type="hidden" id="itExperiencia_descarga" name="experiencia"  value=""  >
                <input type="hidden" id="itFecha_descarga" name="fcita"  value="">
                <input type="hidden" id="itHora_descarga" name="hcita">
          </form>
          <div class="js-spinner-holder"></div>
        </div>
<!--         <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
        </div>
 -->      </div>
          
    </div>
  </div>


  <footer>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-2 text-left">
          <a href="http://www.phb.es/" target="_blank"><img src="dist/images/footer-logo-jata.png" alt="Jata Plan Gourmet"></a>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-2 col-md-offset-8 text-right hidden-md hidden-lg ">
         <a href="http://www.tlcmarketing.com/es" target="_blank"><img src="dist/images/footer-logo-tlc.png" alt="TLC" class="logo-tlc-footer"></a>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-8 text-center col-menu-footer ">
          <ul>
            <li><a href="documentos/terminos-condiciones.pdf" target="_blank">Términos y Condiciones</a></li>
            <li><a href="documentos/politica-cookies.pdf" target="_blank">Privacidad y Cookies</a></li>
            <li class="last last-text"><a href="javascript:;" class="js-trigger-click" data-trigger-target=".js-btn-contacta">Contacta</a></li>
            <!-- <li class="last li-rs firts-li-rs" ><a href="https://www.facebook.com/PHBSaludBucal" target="_blank" class="icono-rss" title="Facebook"><i class="fa fa-facebook-square"></i></a></li>
            <li class="last li-rs"><a href="https://twitter.com/PHB_es" target="_blank" class="icono-rss" title="Twitter"><i class="fa fa-twitter-square"></i></a></li>
            <li class="last li-rs" ><a href="http://www.youtube.com/phbsaludbucal" class="icono-rss" target="_blank" title="YouTube"><i class="fa fa-youtube-square"></i></a></li>
            <li class="last li-rs"><a href="http://instagram.com/phb_es" class="icono-rss" target="_blank" title="Instagram"><i class="fa fa-instagram"></i></a></li> -->
          </ul>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-2 text-center-xs text-right visible-md visible-lg">
         <a href="http://www.tlcmarketing.com/es" target="_blank"><img src="dist/images/footer-logo-tlc.png" alt="TLC" class="logo-tlc-footer"></a>
        </div>
     </div>
     </div>
 </footer>




 <!-- jQuery -->
 <script src="dist/scripts/<?=asset_path('jquery.js')?>"></script>
 <script src="dist/scripts/<?=asset_path('modernizr.js')?>"></script>
 <script src="dist/scripts/<?=asset_path('main.js')?>"></script>

</body>
</html>