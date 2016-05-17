/*
 * Widget 1: Simple AJAX Form
 * Requiere: spin.js o spin.min.js
 * Descripción: envía el formulario y recarga el resultado en la capa indicada, desde el botón de submit() o desde eventos en los campos o en los plugins que lo requieran.
 * Opciones:
 *   url, default atributo data-url
 *   target, default atributo data-ajax-target
 *   data: form.serialize()
 *   spin: 'defaultSpin'
 *   mensajeError: "Se ha producido un error al procesar su peticion"
 *   strType: Get or post
 *   callback: function(obj,target)
 * */
 (function ($) {
    $.fn.simpleAjaxForm = function(options) {
      console.log('a enviar, action = '+$(this).attr('action'));
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

        spinner_holder = $(this).parents('.inner-contenedor-formulario').find('.spinner-holder');
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
    /* anti paste*/
    $('.anti-paste').bind("cut copy paste",function(e) {
        e.preventDefault();
    });
    $('.js-simple-ajax-form').validator(customValidations()).on('submit', function (e) {
        
        if (e.isDefaultPrevented()) {
          // Recoger los campos con error
          lista_errores = "<ul>";
          $(this).find('.has-error').each(function(index, element){
              lista_errores += '<li>'+$(this).find('label').html()+'</li>';
          });
          lista_errores += '</ul';
          // handle the invalid form...
          if ($(this).data('mensaje-error') !== undefined && $(this).data('mensaje-error') !== ''){
              $('#myModal').mostrar_msg("Revisa los datos", $(this).data('mensaje-error')+lista_errores);
          }else{
              $('#myModal').mostrar_msg("Revisa los datos", "Revisa todos los datos antes de continuar"+lista_errores);              
          }

        } else {
            // everything looks good!
            e.preventDefault();
            $(this).simpleAjaxForm();
        }
    });    
    // spinner
    var spinner = new Spinner({color:'#000', lines: 12, length: 5, width: 4}).spin();

    $('.js-ajax-form-with-images, .js-simple-ajax-form').each(function(index){
      var contenedor_spinner;
      if ($($(this).data('spinner-holder')).length > 0){
        contenedor_spinner = $($(this).data('spinner-holder'));
      }else{
        contenedor_spinner = $('body');
      }
      if (contenedor_spinner.find('.spinner-holder').length == 0){
        $('<div id="sp-'+index+'" class="spinner-holder">&nbsp;</div>').appendTo(contenedor_spinner);
        document.getElementById('sp-'+index).appendChild(spinner.el);
        $('<p class="spinner-holder-text">&nbsp;</p>').appendTo($('#sp-'+index));
      }
    });


    $('.js-ajax-form-with-images').validator(customValidations()).on('submit', function (e) {
        
        if (e.isDefaultPrevented()) {
          // Recoger los campos con error
          lista_errores = "<ul>";
          $(this).find('.has-error').each(function(index, element){
            if ($(this).data('mensaje-error') !== undefined && $(this).data('mensaje-error') !== ''){
              lista_errores += '<li>'+$(this).data('mensaje-error')+'</li>'; 
            }else{
              lista_errores += '<li>'+$(this).find('label').html()+'</li>';            
            }
          });
          lista_errores += '</ul';
          // handle the invalid form...
          if ($(this).data('mensaje-error') !== undefined && $(this).data('mensaje-error') !== ''){
              $('#myModal').mostrar_msg("Revisa los datos", $(this).data('mensaje-error')+lista_errores);
          }else{
              $('#myModal').mostrar_msg("Revisa los datos", "Revisa todos los datos antes de continuar"+lista_errores);              
          }

        } else {
            // everything looks good!
            e.preventDefault();
            // fn.ajaxFormWithImages() en js-examinar.js
            $(this).ajaxFormWithImages();
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

    var targetSpinner= document.getElementById(_target);
    var targetJquery=$("#"+_target);
    if(targetJquery.hasClass("spinner-holder")){
        targetFade=".spinner-holder"
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
            movil: function ($el) {
                return validarMovil($el.val());
            },
            dni: function ($el) {
                return validarDNI($el.val());
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
            movil: "Revisa el número de teléfono móvil",
            dni: "Revisa el DNI",
            mayoredad: "Para participar en la promoción tienes que ser mayor de edad",
            fecha: "Introduce una fecha válida",
            hora: "Introduce una hora válida en el formato indicado",
            file: "Selecciona un archivo"
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
  return true;

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


  