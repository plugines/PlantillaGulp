$(document).ready(function() {
	
	var imgClone = null;
	
	$(".js-examinar").each(function(e) {
		var boton_examinar = $(this).attr('id');
		var boton_enviar = $("#"+$(this).data("js-examinar-boton-enviar"));
		var url = $(this).data("js-examinar-url");
		var target = $(this).data("js-examinar-target") ? $(this).data("js-examinar-target") : null;
		var maxsize = $(this).data("js-examinar-maxsize") ? $(this).data("js-examinar-maxsize") : "10Mb";
		var target = $(this).data("js-examinar-target") ? $("#"+$(this).data("js-examinar-target")) : null;
		var nombrearchivo = $(this).data("js-examinar-nombre-archivo") ? $("#"+$(this).data("js-examinar-nombre-archivo")) : null;
		var accepted = [];
		if ( $(this).data("js-examinar-accept") )
		{
			var af = $(this).data("js-examinar-accept").split(/,/);
			for (var i=0; i<af.length; i++)
			{
				if (af[i] == "images") accepted.push({title : "Image files", extensions : "jpg,jpeg,gif,png"});
				if (af[i]== "zip") accepted.push({title : "Zip files", extensions : "zip"});
				if (af[i] == "pdf") accepted.push({title : "PDF files", extensions : "pdf"});
			}
		}
		
		var multi_selection = $(this).data("js-examinar-multi-selection") ? eval($(this).data("js-examinar-multi-selection")) : false;
		
		var callback = $(this).data("js-examinar-callback");
		var nofile = $(this).data("js-examinar-nofile") ? $(this).data("js-examinar-nofile") : null;
		var filter = $(this).data("js-examinar-filter");
		var formulario = $("#"+$(this).data("js-examinar-form"));
		
		var fileAdded = false;
		
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
					boton_enviar.click(function(e) {
						if (fileAdded) 
						{
							if(window[filter]()) 
							{
								var datos = {};
								var json = {};
								if (formulario)
								{
									datos = formulario.serializeArray();
									$.each(datos, function() { json[this.name] = this.value; });
								}
								uploader.settings.multipart_params = json;								
								uploader.start();
								console.log("start upload");
								$("#sp-2").show();
							}
						}
						else if (nofile != null) window[nofile]();
					});
				},
		
				FilesAdded: function(up, files) {
					file = files[files.length-1];
					if (nombrearchivo) {
						nombrearchivo.val(file.name);
						//console.log('file::'+file.name);
					}	
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
					window[callback](-1);	
				},
				
				FileUploaded: function(up, file, response) {
					window[callback](response.response);	
				}
			}
		});

		uploader.init();
		this.uploader = uploader;
		
	});
	
	$(".js-examinar").click(function(e) {
		this.uploader.splice();
	});
});