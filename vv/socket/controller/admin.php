<?php

//后台主页类
class w_admin {

	//初始化
	function __construct($request){
		
	}
	
	//登陆
	function loginAction($request){
		include_once(PATH."/class/mysql.php");
		$db = new mysql();
		$whereArr = array("userName" => "admin");
		$db -> dbconnect();
		$result = $db -> getRow("user",$whereArr);
		$db -> close();
		$status = 0;
		$backArr = array();
		$backArr["command"] = $request["command"];
		$backArr["action"] = $request["action"];
		$backArr["status"] = $status;
		echo json_encode($backArr);
		return json_encode($backArr);
	}
	
}

?>
