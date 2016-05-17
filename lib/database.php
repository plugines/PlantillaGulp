<?php

class DataBase {
    
	public function __construct( $dbhost, $dbname , $dbuser , $dbpass ) {

		$params = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
		
		try { 		
			$this->conn = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser,$dbpass, $params);
		} catch( PDOExecption $e ) { 
			print "Error!: " . $e->getMessage() . "</br>"; 
		} 	

    }
 
	public function __destruct(){
       $this->conn = null;
    }
	
	public function query($query)
	{
		$st = $this->conn->prepare($query);
		$st->execute($params);
		$result = $st->fetchAll();
		
		return $result;		
	}

	public function select ($tabla, $where = array(), $order = array(), $desc = false, $limit = "")
	{
		$query = "SELECT * FROM `".$tabla."` WHERE 1";
		$params = array();
		foreach ($where as $key=>$value) 
		{
			$query .= " AND $key = :$key";
			$params[":$key"] = $value;
		}
		if (count($order) > 0) 
		{
			$query .= " ORDER BY ";
			foreach ($order as $f) $query .= "$f, ";
			$query = substr($query, 0, strlen($query)-2);
		}
		if ($desc) $query .= " DESC";
		if ($limit != "") $query .= " LIMIT ".$limit;

		$st = $this->conn->prepare($query);
		$st->execute($params);
		$result = $st->fetchAll();
		
		return $result;
	}

	public function insert ($tabla, $values)
	{
		$params = array();
		$campos = "";
		$valores = "";
		$res = -1;
		foreach ($values as $key=>$value) 
		{
			$campos .= "$key,";
			$valores .= ":$key,";
			$params[":$key"] = $value;
		}
		$campos = substr($campos, 0, strlen($campos)-1);
		$valores = substr($valores, 0, strlen($valores)-1);
		$query = "INSERT INTO `".$tabla."` (".$campos.") VALUES (".$valores.")";

		$st = $this->conn->prepare($query);
		try { 
			$this->conn->beginTransaction();
			$st->execute($params);
			$res = $this->conn->lastInsertId();
			$this->conn->commit(); 
		} catch(PDOExecption $e) { 
			$this->conn->rollback(); 
			print "Error!: " . $e->getMessage() . "</br>"; 
		} 
		return $res;
	}

	public function update ($tabla, $values, $where = array())
	{
		$params = array();
		$sets = "";
		foreach ($values as $key=>$value) 
		{
			$sets .= $key." = :".$key.", ";
			$params[":$key"] = $value;
		}
		$sets = substr($sets, 0, strlen($sets)-2);
		$query = "UPDATE `".$tabla."` SET ".$sets." WHERE 1";
		foreach ($where as $key=>$value) 
		{
			$query .= " AND $key = :where_$key";
			$params[":where_$key"] = $value;
		}		
		$st = $this->conn->prepare($query);
		try { 
			$this->conn->beginTransaction();
			$st->execute($params);
			$this->conn->commit(); 
		} catch(PDOExecption $e) { 
			$this->conn->rollback();
			print "Error!: " . $e->getMessage() . "</br>"; 
			return false;
		} 
		return true;
	}
	
	public function delete ($tabla, $where)
	{
		$query = "DELETE FROM `".$tabla."` WHERE 1";
		$params = array();
		foreach ($where as $key=>$value) 
		{
			$query .= " AND $key = :$key";
			$params[":$key"] = $value;
		}
		$st = $this->conn->prepare($query);
		try { 
			$this->conn->beginTransaction();		
			$st->execute($params);
			$this->conn->commit(); 			
		} catch(PDOExecption $e) { 
			$this->conn->rollback();
			print "Error!: " . $e->getMessage() . "</br>"; 
			return false;
		} 			
	}

}
?>