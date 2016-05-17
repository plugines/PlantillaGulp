<?php

$resultado['cod'] = "KO";

if (isset($_FILES['file']))
{
	$tmp_name = $_FILES["file"]["tmp_name"];
	$name = $_FILES["file"]["name"];
	move_uploaded_file($tmp_name, "uploads/".$name);	

	// Esta función se puede encontrar en esqueleto-bootstra-borja-v1.1
	image_fix_orientation("uploads/".$name);		
	
	$resultado['cod']=getcwd()."/uploads/".$name;
}

echo (json_encode($resultado));

?>