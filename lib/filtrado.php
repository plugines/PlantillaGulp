<?php

	$filtrando = array("\"", "\\", "*", "'", "=", "--", "#", ";", "<", ">", "+", "%","script","alert","javascript","CreateObject","ActiveXobject","GetParentFolderName","GetFolder","GetExtensionName","Replace","Opentextfile","DeleteFile","CopyFile","RegWrite",'javascript', 'vbscript', 'expression', 'applet', 'meta', 'xml', 'blink', 'link', 'style', 'script', 'embed', 'object', 'iframe', 'frame',    'frameset', 'ilayer', 'layer', 'bgsound', 'title', 'base','onabort', 'onactivate', 'onafterprint', 'onafterupdate',    'onbeforeactivate', 'onbeforecopy', 'onbeforecut', 'onbeforedeactivate',    'onbeforeeditfocus', 'onbeforepaste', 'onbeforeprint', 'onbeforeunload',    'onbeforeupdate', 'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick', 'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavailable',    'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate', 'ondrag',    'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop',    'onerror', 'onerrorupdate', 'onfilterchange', 'onfinish', 'onfocus', 'onfocusin',    'onfocusout', 'onhelp', 'onkeydown', 'onkeypress', 'onkeyup', 'onlayoutcomplete',    'onload', 'onlosecapture', 'onmousedown', 'onmouseenter', 'onmouseleave',    'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel',    'onmove', 'onmoveend', 'onmovestart', 'onpaste', 'onpropertychange',    'onreadystatechange', 'onreset', 'onresize', 'onresizeend', 'onresizestart',    'onrowenter', 'onrowexit', 'onrowsdelete', 'onrowsinserted', 'onscroll',    'onselect', 'onselectionchange', 'onselectstart', 'onstart', 'onstop',    'onsubmit', 'onunload', "delete", "insert", "join", "select", "update","drop",";","<",">", "*", "&");
     foreach($_GET as $variable => $valor){
          $variable = "get_".$variable;
 		  $$variable = htmlspecialchars(str_ireplace($filtrando, "", $valor));
	
		  do{
		  $valorTemp = $$variable;
		  $$variable = str_ireplace($filtrando, "", $$variable);

		  }
		  while($valorTemp != $$variable);
     }
     foreach($_POST as $variable => $valor){
		  $variable = "post_".$variable;
 		  $$variable = htmlspecialchars(str_ireplace($filtrando, "", $valor));
	
		  do{
		  $valorTemp = $$variable;
		  $$variable = str_ireplace($filtrando, "", $$variable);

		  }
		  while($valorTemp != $$variable);
     }