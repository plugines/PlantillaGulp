(function ($) {
    $.fn.ajaxFormWithImages = function(options) {

		formulario = document.getElementById($(this).attr('id'));
		formulario.comenzar();
    };
 
}(jQuery));



$(document).ready(function() {
	var imgClone = null;
	
	$(".js-ajax-form-with-images").each(function(e) {
		//alert('test = '+$(this).data('boton-examinar-img'));
		var spinner_holder = $($(this).data('spin-target')).find('.js-spinner-holder');
		var boton_examinar = $(this).data('id-boton-examinar-img');
		var url = ($(this).prop("tagName")=='FORM')?$(this).attr('action'):$(this).data('url');
		var target = $(this).data("target-preview-img") ? $(this).data("target-preview-img") : null;
		var maxsize = $(this).data("maxsize-img") ? $(this).data("maxsize-img") : "10Mb";
		var targername = $(this).data("input-para-nombre-img") ? $($(this).data("input-para-nombre-img")) : null;
		var accepted = [];
		if ( $(this).data("tipo-archivos-validos") )
		{
			var af = $(this).data("tipo-archivos-validos").split(/,/);
			for (var i=0; i<af.length; i++)
			{
				if (af[i] == "images") accepted.push({title : "Image files", extensions : "jpg,jpeg,gif,png"});
				if (af[i]== "zip") accepted.push({title : "Zip files", extensions : "zip"});
				if (af[i] == "pdf") accepted.push({title : "PDF files", extensions : "pdf"});
			}
		}
		
		var multi_selection = $(this).data("multi-selection-img") ? eval($(this).data("multi-selection-img")) : false;
		
		var callback = $(this).data("callback");
		var nofile = $(this).data("callback-nofile");
		var filter = $(this).data("callback-filtro")?$(this).data("callback-filtro"):null;
		var formulario = $(this);
		
		var fileAdded = false;
		this.fileAdded = fileAdded;

		referencia_this = document.getElementById($(this).attr('id'));
		
		var uploader = new plupload.Uploader({
			runtimes : 'html5,flash,silverlight,html4',
			browse_button : boton_examinar, // you can pass an id...
			url : url,
			flash_swf_url : 'js/Moxie.swf',
			silverlight_xap_url : 'js/Moxie.xap',
			multi_selection: multi_selection,
			
			filters : {
				max_file_size : maxsize, //'10mb',
				mime_types: accepted
			},
		
			init: {
				PostInit: function() {

					//console.log('en init, referencia_this = '+referencia_this);
					//document.getElementById($(this).attr('id'));
					referencia_this.comenzar = function() {
					    
						if (fileAdded) 
						{
							spinner_holder.fadeIn();
							//if(window[filter]()) {
								var datos = {};
								var json = {};
								if (formulario)
								{
									datos = formulario.serializeArray();
									$.each(datos, function() { json[this.name] = this.value; });
								}
								uploader.settings.multipart_params = json;
								uploader.start();
							//}
						}
						else window[nofile]();


					}
				},
		
				FilesAdded: function(up, files) {
					file = files[files.length-1];
					if (targername) targername.val(file.name);
					if (target)
					{
						$.each(files, function () {
							var img = new mOxie.Image();
							img.onload = function () {
								target.empty();
								this.embed(target.get(0), {
									width: target.width(),
									height: target.height()
								});
							};
							img.onembedded = function () {
								this.destroy();
							};
							img.onerror = function () {
								this.destroy();
							};
							img.load(this.getSource());
						});						
					}
					
					
					fileAdded = true;
					
				},
		
				Error: function(up, err) {
					result = '{"resultado":"KO","error":{"code":"90102","msg_error":"Ha ocurrido un error, vuelva a intentarlo más tarde."}}';
					if ($.isFunction(window[callback])){window[callback](formulario,null,result, spinner_holder)};
					//window[callback](-1);	
				},
				
				FileUploaded: function(up, file, response) {
					if ($.isFunction(window[callback])){window[callback](formulario,'',response.response, spinner_holder)}; // obj = formulario, ajaxTarget = target de los datos (puede ser = ''), result = resultado devuelto por el ajax
                	//spinner_holder.fadeOut(); // el spinner lo oculta el callback
				}
			}
		});
		uploader.init();
		this.uploader = uploader;
		this.fileAdded = fileAdded;

		$('#'+$(this).data('id-boton-examinar-img')).on('click', function(e){
			uploader.splice();
		});
		
	});
	

});
