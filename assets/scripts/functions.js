/*
 * Widget 1: Simple AJAX Form
 * Requiere: spin.js o spin.min.js
 * Descripción: envía el formulario y recarga el resultado en la capa indicada, desde el botón de submit() o desde eventos en los campos o en los plugins que lo requieran.
 * Opciones:#itExperiencia
 *   url, default atributo data-url
 *   target, default atributo data-ajax-target
 *   data: form.serialize()
 *   spin: 'defaultSpin'
 *   mensajeError: "Se ha producido un error al procesar su peticion"
 *   strType: Get or post
 *   callback: function(obj,target)selProvincia
 * */
 (function ($) {
    $.fn.simpleAjaxForm = function(options) {
     // console.log('a enviar, action = '+$(this).attr('action'));
        var defaults = {
            url: ($(this).prop("tagName")=='FORM')?$(this).attr('action'):$(this).data('url'),
            ajaxTarget:($(this).data('ajax-target'))?$(this).data('ajax-target'):'',
            data: ($(this).prop('tagName')=='FORM') ? $(this).serialize() : $(this).closest('form').serialize(),
            spinTarget: $(this).data('id-spin-target'),
            mensajeError: "Se ha producido un error al procesar su peticion",
            strType:($(this).prop("tagName")=='FORM')?$(this).attr('method'):(($(this).data('srttype'))?$(this).data('srttype'):'GET'),
            callback: ($(this).data('callback'))?$(this).data('callback'):function(obj,target, result){}
        }

        var settings = $.extend( {}, defaults, options );
        if($(this).data('strtype')){
            settings.strType=$(this).data('strtype');
        }
        var url=settings.url,
            spinTarget=settings.spinTarget,
            ajaxTarget=settings.ajaxTarget,
            data=$(this).data('ajax-no-data') ? {} : settings.data,
            strType=settings.strType,
            callback=settings.callback,
            obj=($(this).prop("tagName")=='FORM')?$(this):$(this).closest('form');

           
        dataType = (ajaxTarget == '')?'json':'html';

        spinner_holder = $(this).parents('.inner-contenedor-formulario').find('.js-spinner-holder');

        spinner_holder.fadeIn(function(){
            //perform ajax request
            $.ajax({
                url: url,
                data: data,
                dataType: dataType,
                type:strType
            })
            .done( function (result) {
                if (dataType == 'html'){
                    $(ajaxTarget).html(result);                    
                }
                if ($.isFunction(window[callback])){window[callback](obj,ajaxTarget,result, spinner_holder)}; // obj = formulario, ajaxTarget = target de los datos (puede ser = ''), result = resultado devuelto por el ajax
                //spinner_holder.fadeOut(); // el spinner lo oculta el callback
                
            })
            .fail(function() {
                result = '{"resultado":"KO","error":{"code":"90102","msg_error":"Ha ocurrido un error, vuelva a intentarlo más tarde."}}';
                if ($.isFunction(window[callback])){window[callback](obj,ajaxTarget,result, spinner_holder)}; // obj = formulario, ajaxTarget = target de los datos (puede ser = ''), result = resultado devuelto por el ajax
                //spinner_holder.fadeOut(); // el spinner lo oculta el callback
            });

        });

        


        //loader_spinner(spinTarget,'hide'); // Lo debe cerrar el callback
    };

 
(function ($) {
    $.fn.mostrar_msg = function(_title, _msg){
        if ($(this).find('.modal-title').length && $(this).find('.modal-body').length){
            $(this).find('.modal-title').html(_title);
            $(this).find('.modal-body').html('<p>'+_msg+'</p>');
            $(this).modal();
        } else {
            alert(_title+": "+_msg);
        }
    };
 
}(jQuery));



$(document).ready(function(){
    var windowHeight=$(window).height();
    var windowWidth=$(window).width();

    var rtime;
    var timeout = false;
    var delta = 200;
    $(window).resize(function() {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta);
        }
    });

    function resizeend() {
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;
            windowHeight=$(window).height();
            windowWidth=$(window).width();
            init_fs_scroll();
        }               
    }

    /* anti paste*/
    $('.anti-paste').bind("cut copy paste",function(e) {
        e.preventDefault();
    });
    
    /*para hacer tooble de objetos*/
    $('.js-fadeinout').click(function(){
        var target=$(this).data("mostrar");
       
        $(target).slideToggle({
          duration:800,
          easing: "easeOutQuad",
          complete: function(){
            if($(target).is(":visible")){
              $("*[data-mostrar='"+target+"']").each(function(){
                  $(this).removeClass("slide-cerrado");
                  $(this).addClass("slide-abierto");
              });
            }else{
              $("*[data-mostrar='"+target+"']").each(function(){
                  $(this).removeClass("slide-abierto");
                  $(this).addClass("slide-cerrado");
              });
            }
          }
        });
    });

    $(".js-scroll-ancla").on('click', function(event){
      event.preventDefault();
      var hash = this.hash;
      var offset= $(this).data("scroll-offset");
      $('html, body').animate({
        scrollTop: $(hash).offset().top-offset
      }, 800, function(){
        if(offset>0){
          //no se pone porque da salto al aplicar el offset
        }else{
          window.location.hash = hash; 
        }
      });
    });


  $('.js-enviar-form-con-validator').validator(customValidations()).on('submit', function (e) {

        // comprobamos si hay que enviarlo por ajax o se envía a una url directamente
        // Por defecto envía por ajax
        if ($(this).data('enviar-ajax') == undefined || $(this).data('enviar-ajax') == true){
          enviar_por_ajax = true;
        }else{
          enviar_por_ajax = false;
        }
        //console.log('enviar ajax = '+enviar_por_ajax);
        // Comprobamos si hay un campo input type:file
        if ($(this).find('input[type="file"]').length > 0  ){
          hay_archivos = true;
        }else{
          hay_archivos = false;
        }
        //console.log('hay archivos = '+hay_archivos);
        // Revisamos errores
        if (e.isDefaultPrevented() ) {
          // Recoger los campos con error
          lista_errores = "<ul>";
          $(this).find('.has-error').each(function(index, element){
            if ($(this).data('mensaje-error') !== undefined && $(this).data('mensaje-error') !== ''){
              lista_errores += '<li>'+$(this).data('mensaje-error')+'</li>'; 
            }else{
              lista_errores += '<li>'+$(this).find('label').html()+'</li>';            
            }
          });
          lista_errores += '</ul>';

          // handle the invalid form...
          if ($(this).data('mensaje-error') !== undefined && $(this).data('mensaje-error') !== ''){
              $('#myModal').mostrar_msg("Revisa los datos:", $(this).data('mensaje-error')+lista_errores);
          }else{
              $('#myModal').mostrar_msg("Revisa los datos:", "Revisa todos los datos antes de continuar"+lista_errores);              
          }

        } else {
          // No hay errores
          // Sacamos el spinner

              if ($(this).data('spinner-holder') != ''){
                spinner_holder = $($(this).data('spinner-holder')).find('.js-spinner-holder');
              }else{
                $('body').find('.js-spinner-holder');
              }
              spinner_holder.fadeIn();
              // Si lleva imágenes, añadimos un "loading"
              if (hay_archivos){
                spinner_holder.find('.js-spinner-holder-text').html('Subiendo imagen...');
              }else{
                spinner_holder.find('.js-spinner-holder-text').html('');
              }
              
              // Si hay que enviarlo por ajax ejecutamos simpleAjaxForm, si no, dejamos que haga el submit
              if (enviar_por_ajax){
                $(this).simpleAjaxForm();
                e.preventDefault();
              }
            }
      }); 

      // Añadimos spinners a los contenedores
      $('.js-spinner-holder').each(function(index){
          var spinner = new Spinner({color:'#5784b9', lines: 12, length: 5, width: 4}).spin();
          $(this).attr("id","sp-"+index);
          document.getElementById('sp-'+index).appendChild(spinner.el);
      });


/**
  * Ajusta módulo a full screen.
  *
  * @param data-fs-maxheight?    ::  si pasa de esta altura, ya no aumenta más
  * @param data-fs-minheight?    ::  si baja de esta altura, ya no reduce más
  * @param data-fs-minwidth      ::  si baja de ese ancho, ya no ajusta
  * @param data-fs-offsettop     ::  margen superior
  * @param data-fs-offsetbottom  ::  margen inferior
  * @throws
  */
  var ot=$("body").data("fs-offsettop");
  var ob=$("body").data("fs-offsetbottom");
  var mw=$("body").data("fs-minwidth");
  function init_fs_scroll(){
    $('.js-full-screen').each(function(index){
      $(this).attr("fs-altura-inicial",$(this).height());
      if(windowWidth>=mw){
          var pt=$(this).css("padding-top");
          var pb=$(this).css("padding-bottom");
          var altura=windowHeight-ot-ob-parseInt(pt)-parseInt(pb);
        if ($(this).children().first().hasClass("fs-content")) {
          //si ya tiene wrap, solo cambio altura a la nueva dimensión de ventana
          $(this).find(".fs-content").height(altura); // pone nuevo alto a contenedor
          $(this).find(".fs-content").css("min-height",$(this).find(".fs-content").find(".fs-content-vertical").height()); // pone altura mínima sobre el alto original
        }else{
          $(this).css("height","auto"); //anula alto section
          $(this).wrapInner("<div class='fs-content'></div>"); // inserta div para forzar altura
          $(this).find(".fs-content").wrapInner("<div class='fs-content-vertical'></div>");// inserta div para centrado vertical
          $(this).find(".fs-content").css("min-height",$(this).find(".fs-content").find(".fs-content-vertical").height()); // pone altura mínima sobre el alto original
          $(this).find(".fs-content").height(altura); // pone nuevo alto a contenedor
        }
      }else{
        if ($(this).children().first().hasClass("fs-content")) {
            $(this).children().children().first().unwrap();
            $(this).children().children().first().unwrap();
            $(this).css("height",$(this).data("fs-altura-inicial"));
        }
      }
    });
  }
  //$(".js-full-screen:last-child").css("margin-bottom",ob+"px");
  init_fs_scroll();



/**
  * Replica click de otro objeto TOM.
  *
  * @param data-trigger-target :: objeto que hace clic
  * @throws
  */
      $('.js-trigger-click').on('click', function(e){
            var target=$(this).data("trigger-target");
            $(target).trigger( "click" );
      });
/**
  * Hace scroll animado a un target.
  *
  * @param data-scroll-target :: objeto al que hace scroll
  */
        $('.js-menu-scroll').on('click', function(e){
          //console.log("****** MENU-SCROLL **** DEPRECATED!!!!");
          // var boton=$(this);
          // var seccion = $(boton.data("scroll-target"));
          // // calculo altura cabecera
          // if($('.navbar-collapse').attr('aria-expanded')=='true'){
          //   _navbarHeight = $('.navbar-header').outerHeight(false);
          //   $('.navbar-toggle').click();
          // } else {
          //   _navbarHeight = $('.navbar-collapse').outerHeight(false);

          // }

          // var scrollDistance = Math.abs(Math.round(seccion.offset().top) - Math.round($('html, body').scrollTop())-120);
          // var velocityFactor = 1;
          // var velocity =  velocityFactor*Math.round((1 / 900) * scrollDistance + 5/9);// px/ms
          // $('html, body').stop().animate({scrollTop:seccion.offset().top-_navbarHeight}, scrollDistance/velocity, 'swing', function() { 
          //    //boton.parent().addClass('activo');
          // });

        });

        /**
        *Muestra mensaje de confirmación con dos botones, uno para seguir y otro para cancelar
        *
        */
        $('.js-mostrar-confirmacion').on('click', function(e){
               /* $("#cliente_id_descarga").val($('#cliente_id_bono').val());
                $("#codigo_redimir_descarga").val($('#codigo_redimir_bono').val());
                $("#codigo_centro_descarga").val($('#codigo_centro').val());
                $("#codigo_experiencia_descarga").val($('#codigo_experiencia').val());
                $("#direccion_centro_descarga").val($('#direccion_centro').val());
                $("#telefono_centro_descarga").val($('#telefono_centro').val());
                $("#provincia_centro_descarga").val($('#provincia_centro').val());*/
                $("#itNombre_descarga").val($('#itNombre_bono').val());
                $("#itDNI_descarga").val($('#itDNI_bono').val());
                $("#itTelefono_descarga").val($('#itTelefono_bono').val());
                $("#itApellidos_descarga").val($('#itApellidos_bono').val());
                $("#itEmail_descarga").val($('#itEmail_bono').val());
                $("#itCentro_descarga").val($('#itCentro').val());
                //$("#itExperiencia_descarga").val($('#itExperiencia').val());
                $("#itFecha_descarga").val($('#itFecha').val());
                $("#itHora_descarga").val($('#itHora').val());



            $('#myModalConfirmacion').modal(); 





        });

        

 /**
    * Muestra una alerta al hacer click en el elemento
    * 
    * @data-alerta-campo: mensaje a mostrar
    * @data-titulo-alerta: titulo del mensaje
    * @data-mostrar-siempre: 0 si solo se muestra la primera vez que haga click, 1 si se tiene que mostrar siempre que se haga click
  */
      $('.js-alerta-campo').on('click', function(e){         
          var elem=$(this);
          var mensaje = elem.data("alerta-campo");
          var titulo = elem.data("titulo-alerta");
          var mostrar_siempre = elem.data("mostrar-siempre");

         // console.log('m::'+$(this).data("alerta-campo"));
          $('#myModal').mostrar_msg(titulo, mensaje);  

          if (mostrar_siempre == '0'){
            $(this).unbind('click');
          }
      });




  })

/*function validarEmail(mail) {
  var exr = /^[0-9a-z_\-\.]+@[0-9a-z\-\.]+\.[a-z]{2,4}$/i;
  return exr.test(mail);
}*/

function cargaAjax(_url,_form,_callback){
      $.ajax({
        url: _url,
        data: $(_form).serialize(),
        dataType: 'json',
        type:'post'
      })
      .done( function (result) {
            loader_spinner("js-loader-pasos","hide");
            if (result['resultado'] == 'OK') {
                eval(_callback+'(result)');
            } else {
                $('#myModal').mostrar_msg('Error', result['error']['msg_error']);
            }
      })
      .fail(function() {
        $('#myModal').mostrar_msg("UPS!", "Inténtalo de nuevo más adelante");
            loader_spinner("js-loader-contacto","hide");
            loader_spinner("js-loader-pasos","hide");
      });
}

function loader_spinner(_target,_status){
    //target por ID porque se hace por DOM javascript y NO jquery
   // console.log(_target);
    var targetSpinner= document.getElementById(_target);
    var targetJquery=$("#"+_target);
    if(targetJquery.hasClass("js-spinner-holder")){
        targetFade=".js-spinner-holder"
    }else{
        targetFade="#"+_target;
    }

    if(_status=="show"){
        $(targetSpinner).html("");
        new Spinner({color:'#fff', lines: 12, length: 5, width: 4}).spin(targetSpinner);
        $(targetFade).fadeIn();
    }else{
        $(targetFade).fadeOut(function(){
            $(targetSpinner).html("");
        });
    }

}






}(jQuery));

// get_browser
function get_browser(){
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;// At least Safari 3+: "[object HTMLElementConstructor]"
    var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
    var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
    switch(true){
        case isOpera:
            return 'Opera';
        case isFirefox:
            return 'Firefox';
        case isSafari:
            return 'Safari';
        case isChrome:
            return 'Chrome';
        case isIE:
            return 'IE';
        default:
            return '';
    }
}

// Custom validations for bootstrap validator
function customValidations(){

    var validatorOptions = {
        delay: 100,
        custom: {
            cp: function ($el) {
                return validarCP($el.val());
            },
            telefono: function ($el) {
                return validarMovil($el.val()) || validarFijo($el.val());
            },
            dni: function ($el) {
                return validarDNI($el.val().toUpperCase());
            },
            mayoredad: function ($el) {
                edad = $el.val().split('/');
                return validarMayorEdad(edad[0], edad[1], edad[2]);
            },
            fecha: function ($el) {
                _fecha = $el.val().split('/');
                return esFechaValida(_fecha[0]+'-'+_fecha[1]+'-'+_fecha[2]); //dd/mm/aaaa
            },
            hora: function ($el) {
                //_fecha = $el.val().split('/');
                return esHora($el.val()); //hh/mm
            },
            mayorhoy: function($el){
                _fecha = $el.val().split('/');
                return validarMayorHoy(_fecha[0], _fecha[1], _fecha[2]);
            },
            fechalimite: function($el){
                _fecha = $el.val().split('/');
                return validarFechaLimite(_fecha[0], _fecha[1], _fecha[2]);
            },
            file: function ($el) {
                if ($el.val() ==''){
                  $($el).parents('.form-group').addClass('has-error');
                  return false;
                }else{
                  $($el).parents('.form-group').removeClass('has-error');
                  return true;
                }
            }
        },
        errors: {
            cp: "Revisa el código postal",
            telefono: "Revisa el teléfono",
            dni: "Revisa el DNI",
            mayoredad: "Para participar en la promoción tienes que ser mayor de edad",
            fecha: "Introduce una fecha válida",
            hora: "Introduce una hora válida en el formato indicado",
            file: "Selecciona un archivo",
            mayorhoy: "Selecciona una fecha posterior al día de hoy",
            fechalimite: "Selecciona una fecha anterior al 31/07/2016" 
        }
    }

    return validatorOptions;

}

function esHora(_hora){// formato hh:mm

  hora = _hora.split(':');
  
  if (parseInt(hora[0]) < 0 || parseInt(hora[0])>24){
    return false;
  }
  if (parseInt(hora[1]) < 0 || parseInt(hora[1])>59){
    return false;
  }
  if (hora.length > 1){
    if (hora[1].length < 2){ //para no permitir algo del tipo 12:1
      return false;
    }
  }
  else {
      return false;
  }
  return true;

}

function validarMayorHoy_OLD(_dia, _mes, _anno){

    day = _dia;
    month = _mes;
    year = _anno;
    //console.log(day+'-'+month+'-'+year);
    var mydate = new Date(year, month, day);
    var hoy = new Date();
//console.log(mydate.getTime()+'::'+hoy.getTime());
   
    if (hoy.getTime() < mydate.getTime()) {
        return true;
    }
    return false;
}
function validarMayorHoy(_dia, _mes, _anno){
        day = _dia;
        month = _mes;
        year = _anno;
        //console.log(day+'-'+month+'-'+year);
        var date2 = new Date(year, month-1, day);
        //date2.setFullYear(year, month - 1, day);
        var today = new Date();
        //console.log(date2);
        
        if (date2<=today)
        {   
            return false;
        }
          else
          {
              return true;
          }   
}
function validarMayorEdad(_dia, _mes, _anno){

    day = _dia;
    month = _mes;
    year = _anno;
    //console.log(day+'-'+month+'-'+year);
    var mydate = new Date();
    mydate.setFullYear(year, month - 1, day);

    var maxDate = new Date();
    maxDate.setYear(maxDate.getYear() - 18);
    //console.log(maxDate);
    //console.log(mydate);
    if (maxDate < mydate) {
        return false;
    }
    return true;
}
function validarFechaLimite(_dia, _mes, _anno){
    day = _dia;
    month = _mes;
    year = _anno;
        //console.log(day+'-'+month+'-'+year);
    var date2 = new Date(year, month-1, day);
        //date2.setFullYear(year, month - 1, day);
    var flimite = new Date('2016', '6', '31');
        //console.log(date2);
        
    if (date2>flimite)
      {   
        return false;
      }
    else
     {
        return true;
      }   
}
function validarEmail(mail) {
  var exr = /^[0-9a-z_\-\.]+@[0-9a-z\-\.]+\.[a-z]{2,4}$/i;
  return exr.test(mail);
}
function validarMovil(tlf) {
  var exr = /[6|7]\d{8}/;
  return exr.test(tlf);
}
function validarFijo(tlf) {
  var exr = /9\d{8}/;
  return exr.test(tlf);
}
function validarDNI2(_dni){
  _dni = _dni.toUpperCase();
  var exr =  "(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))";
  return exr.test(_dni);
}

function isDigit (c){
     return ((c >= "0") && (c <= "9"))
}

function letra_nif(dni){
    var numero = dni % 23 + 1;
    letra='TRWAGMYFPDXBNJZSQVHLCKET';
    letra=letra.substring(numero-1,numero);
    return letra;
}    
    
    
function validar_nie(valor,numero_digitos){
     var i;
     var dni=valor;
     primera_letra = dni.charAt(0);
     if(primera_letra.toUpperCase()!="X" && primera_letra.toUpperCase()!="T" && primera_letra.toUpperCase()!="Y")
          return false;
         
     for (i = 1; i < numero_digitos; i++)
    {  
        var c = dni.charAt(i);
        if (!isDigit(c))
        {
            return false;
        }
    }
    var letra_introducido = letra_nif(dni.substring(1,numero_digitos+1));
    var letra_real = dni.charAt(numero_digitos+1);
    if (letra_introducido == letra_real.toUpperCase())
    {
        return true;
    }
    else
    {
        return false;
    }        
}

function validar_nif(valor){
     var i;
     var dni=valor;
    
     if(dni.length<4){
          return false;    
     }
    
     for (i = 0; i < dni.length-1; i++)
    {  
        var c = dni.charAt(i);
        if (!isDigit(c))
        {
            return false;
        }
    }
    var letra_introducido = letra_nif(dni.substring(0,dni.length-1));
    var letra_real = dni.charAt(dni.length-1);
    if (letra_introducido == letra_real.toUpperCase())
    {
        return true;
    }
    else
    {
        return false;
    }
}    
    

function validarDNI(valor) {

    if(valor.length<9) {
      return false;
    }
   
    dni = valor.toUpperCase();

    letra = valor.substring(valor.length - 1);
    numero = valor.substring(0, 8);

    if (numero.indexOf("X") >= 0){
      numero = numero.replace("X", 0);
    }
    if (numero.indexOf("Y") >= 0){
      numero = numero.replace("Y", 1);
    }
    if (numero.indexOf("Z") >= 0){
      numero = numero.replace("Z", 2);
    }
   
    // Si es un NIE hay que cambiar la primera letra por 0, 1 ó 2 dependiendo de si es X, Y o Z.
   
    modulo = numero % 23;
    letras_validas = "TRWAGMYFPDXBNJZSQVHLCKE";
    letra_correcta = letras_validas.substring(modulo, modulo+1);   //substr($letras_validas, $modulo, 1);
    //console.log('modulo = '+modulo);
    //console.log('letra = '+letra+', letra valida = '+letra_correcta+', numero = '+numero);
    if(letra_correcta!=letra) {
      return false;
    }else {
      return true;
    }


  //var exr = /6\d{8}/;
  //return exr.test(dni);
  //return ( validar_nif(valor) || validar_nie(valor,7) || validar_nie(valor,8) );
}


function contadorTextArea (campo,limite) {
  if (campo.value.length > limite) campo.value = campo.value.substring(0, limite);
  
}

function validaFechaDDMMAAAA(fecha){
  var dtCh= "-";
  var minYear=1900;
  var maxYear=2100;
  function isInteger(s){
    var i;
    for (i = 0; i < s.length; i++){
      var c = s.charAt(i);
      if (((c < "0") || (c > "9"))) return false;
    }
    return true;
  }
  function stripCharsInBag(s, bag){
    var i;
    var returnString = "";
    for (i = 0; i < s.length; i++){
      var c = s.charAt(i);
      if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
  }
  function daysInFebruary (year){
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
  }
  function DaysArray(n) {
    for (var i = 1; i <= n; i++) {
      this[i] = 31
      if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
      if (i==2) {this[i] = 29}
    }
    return this
  }
  function isDate(dtStr){
    var daysInMonth = DaysArray(12)
    var pos1=dtStr.indexOf(dtCh)
    var pos2=dtStr.indexOf(dtCh,pos1+1)
    var strDay=dtStr.substring(0,pos1)
    var strMonth=dtStr.substring(pos1+1,pos2)
    var strYear=dtStr.substring(pos2+1)
    strYr=strYear
    if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
    if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
    for (var i = 1; i <= 3; i++) {
      if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
    }
    month=parseInt(strMonth)
    day=parseInt(strDay)
    year=parseInt(strYr)
    if (pos1==-1 || pos2==-1){
      return false
    }
    if (strMonth.length<1 || month<1 || month>12){
      return false
    }
    if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
      return false
    }
    if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
      return false
    }
    if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
      return false
    }
    return true
  }
  if(isDate(fecha)){
    return true;
  }else{
    return false;
  }
}

function esFechaValida(fecha){
  if (fecha != undefined && fecha != "" ){
    if (!/^\d{2}\-\d{2}\-\d{4}$/.test(fecha)){
//      alert("formato de fecha no vÃ¡lido (dd/mm/aaaa)");
      return false;
    }
    var dia  =  parseInt(fecha.substring(0,2),10);
    var mes  =  parseInt(fecha.substring(3,5),10);
    var anio =  parseInt(fecha.substring(6),10);
  switch(mes){
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      numDias=31;
      break;
    case 4: case 6: case 9: case 11:
      numDias=30;
      break;
    case 2:
      if (comprobarSiBisisesto(anio)){ numDias=29 }else{ numDias=28};
      break;
    default:
    //  alert("Fecha introducida errÃ³nea");
      return false;
  }
    if (dia>numDias || dia==0){
  //    alert("Fecha introducida errÃ³nea");
      return false;
    }
    return true;
  }
}
function comprobarSiBisisesto(anio){
if ( ( anio % 100 != 0) && ((anio % 4 == 0) || (anio % 400 == 0))) {
  return true;
  }
else {
  return false;
  }
}

function validarCP(_cp){
    
    var exr = /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/;
    return exr.test(_cp);

}
function validarProvinciaCP(_provincia, _cp){

  return false;
}




// Custom messages for own browser validations ****** ****** ****** ****** ****** ******
(function init_custom_validations(){

  var x = document.getElementsByClassName("input-nombre");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].addEventListener('invalid', function(e) {
      switch(true){
        case this.validity.valueMissing:
          this.setCustomValidity('Introduzca su nombre.'); 
          $(this).parents('.form-group').addClass('has-error');
          break;
        default:
          this.setCustomValidity('');
          $(this).parents('.form-group').removeClass('has-error');
          e.preventDefault();
      } 
    }, false);  
  };
  var x = document.getElementsByClassName("input-apellido1");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].addEventListener('invalid', function(e) {
      switch(true){
        case this.validity.valueMissing:
          this.setCustomValidity('Introduzca su primer apellido.'); 
          $(this).parents('.form-group').addClass('has-error');
          break;
        default:
          this.setCustomValidity('');
          $(this).parents('.form-group').removeClass('has-error');
          e.preventDefault();
      } 
    }, false);  
  };
  var x = document.getElementsByClassName("input-apellido2");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].addEventListener('invalid', function(e) {
      switch(true){
        case this.validity.valueMissing:
          this.setCustomValidity('Introduzca su segundo apellido.'); 
          $(this).parents('.form-group').addClass('has-error');
          break;
        default:
          this.setCustomValidity('');
          $(this).parents('.form-group').removeClass('has-error');
          e.preventDefault();
      } 
    }, false);  
  };
  var x = document.getElementsByClassName("input-email");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].addEventListener('invalid', function(e) {
      switch(true){
        case this.validity.valueMissing:
          this.setCustomValidity('Introduzca su dirección de email.'); 
          $(this).parents('.form-group').addClass('has-error');
          break;
        case this.validity.typeMismatch:
          this.setCustomValidity('Revise su dirección de email.'); 
          $(this).parents('.form-group').addClass('has-error');
          break;
        default:
          this.setCustomValidity('');
          $(this).parents('.form-group').removeClass('has-error');
          e.preventDefault();
      } 
    }, false);  
  };
  var x = document.getElementsByClassName("input-telefono");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].addEventListener('invalid', function(e) {
      switch(true){
        case this.validity.valueMissing:
          this.setCustomValidity('Introduzca su número de teléfono.'); 
          $(this).parents('.form-group').addClass('has-error');
          break;
        default:
          this.setCustomValidity('');
          $(this).parents('.form-group').removeClass('has-error');
          e.preventDefault();
      } 
    }, false);  
  };
  var x = document.getElementsByClassName("input-movil");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].addEventListener('invalid', function(e) {
      switch(true){
        case this.validity.valueMissing:
          this.setCustomValidity('Introduzca su número de teléfono móvil.'); 
          $(this).parents('.form-group').addClass('has-error');
          break;
        default:
          this.setCustomValidity('');
          $(this).parents('.form-group').removeClass('has-error');
          e.preventDefault();
      } 
    }, false);  
  };
})();



/**
FUNCIONES PAGINACION CONTENIDOS POR ARRAY JS 
*/

/**
  * filtra array por valores.
  *
  * @param array :: array completo sobre el que se hace el filtro
  * @param filtro :: clave del filtro
  * @param valor :: valor del filtro
  * @throws
  */
var arrayFiltroActual=null;
function filtroArray(_array,_filtro1,_valor1){

  if (_valor1!=""){
    var returnedData = $.grep(_array, function (element, index) {
        return element[_filtro1] == _valor1;
    });

    return returnedData;
  }else{
    return _array;
  }
}

/**
  * pinta elementos de un array de JS paginado.
  *
  * @param array :: array del que saca la info
  * @param pagina :: pagina que tiene que mostrar
  * @param totalItemsPagina :: total items por pagina
  * @throws
  */
function paginacionArray(_array,_pagina,_totalItemsPagina){
  var elementoInicial=_totalItemsPagina*(_pagina-1);
  var elementoFinal=elementoInicial+_totalItemsPagina;
  var arrayTemp=_array.slice(elementoInicial,elementoFinal);
  crearPaginacion("#js-paginacion-contenedor",_pagina,_array.length/_totalItemsPagina+1);

  return arrayTemp;
}


/**
  * pinta elementos de un array de JS paginado.
  *
  * @param target :: DOM donde va a insertar HTML
  * @param itemPlantilla :: DOM que sirve de item base para duplicar por cada elemento del array
  * @param array :: array temporal con la paginación resultante
  * @throws
  */
function listarItems(_target,_itemPlantilla,_array,callback){
  var itemPlantilla=$(_itemPlantilla).html();
  $(_target).html("");
  if(_array.length==0){
    $(_target).append("<p class='error-resultado text-center'>Lo sentimos, no hay resultados para esta búsqueda...</p>");
     $(".js-resultado-contenedor").html("");
  }else{
    if(arrayFiltroActual==null){arrayFiltroActual=arrayCentrosCompleto;}
    $(".js-resultado-contenedor").html("Se han encontrado "+arrayFiltroActual.length+" centros:");
    $.each( _array, function( key1, value1 ) {
      var htmlTemp=itemPlantilla;

      $.each(value1, function( key2, value2 ) {
        if(key2=="Phone"){
          var expr = /\(/g;
          value2 = value2.replace(expr, "<small>("); 
        }

        //piden priorizar PartnerSpecifics a Phone
        var find;
        var re;
        
        if(key2=="PartnerSpecifics" && value2!=""){
          //console.log(key2 +">>"+value2);
          find = "{{Phone}}";
          re = new RegExp(find, 'g');
          htmlTemp = htmlTemp.replace(re, "{{PartnerSpecifics}}");
        }
        find = "{{"+key2+"}}";
        re = new RegExp(find, 'g');
        htmlTemp = htmlTemp.replace(re, value2);

      });

      $(_target).append(htmlTemp);
    });
    eval(callback);

  }
  

}


function crearPaginacion(_target,_pagina,_totalPaginas){

  //console.log(_target+'::'+_pagina+'::'+_totalPaginas);
  if (_totalPaginas<1){
    _totalPaginas = 1;

  }
        var options = {
            currentPage: _pagina,
            totalPages: _totalPaginas,
            size:"normal",
            alignment:"center",
            numberOfPages:"8",
            itemTexts: function (type, page, current) {
              switch (type)
              {
              case "first":
                  return "First";
              case "prev":
                  return "< ";
              case "next":
                  return " >";
              case "last":
                  return "Last";
              case "page":
                  return page;
              }
            },
            shouldShowPage:function(type, page, current){
              switch(type)
              {
                  case "first":
                  case "last":
                      return false;
                  default:
                      return true;
              }
            },
            onPageChanged: function(e,oldPage,newPage){
                //console.log("Current page changed, old: "+oldPage+" new: "+newPage);
                clickPaginacion(newPage);
            }
        }
        $(_target).bootstrapPaginator(options);
}

function clickPaginacion(_paginaNueva){
  if(arrayFiltroActual==null){
    arrayFiltroActual=arrayCentrosCompleto;
  }
  var arrayPagina=paginacionArray(arrayFiltroActual,_paginaNueva,totalItemsPagina);
  listarItems(".js-listado-contenedor",".js-item-plantilla",arrayPagina,"callback_descargar_bono()");
}

  